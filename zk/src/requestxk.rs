use actix_web::{ web, App, HttpResponse, HttpServer, Responder };
use expander_compiler::{ frontend::*, utils::serde::Serde };

use serde::{ Deserialize, Serialize };

// use crate::compute_sha256_hash_of_file;

#[derive(Debug, Serialize, Deserialize)]
pub struct WitnessRequest {
    f: String,
    r: String,
    s: String,
}

declare_circuit!(FileCircuit {
    f: PublicVariable, // fileHash: stored in smart contract
    r: Variable, // reference: returned by swarm
    s: Variable, // secretFileHash: provided by user
});

impl Define<M31Config> for FileCircuit<Variable> {
    fn define<Builder: RootAPI<M31Config>>(&self, api: &mut Builder) {
        let f: Variable = self.f;
        let r: Variable = self.r;
        let s: Variable = self.s;

        let combine = api.add(f, r);
        // In a real ZK circuit, you would use a cryptographic hash function
        // that's compatible with the circuit's operations
        let hash_result = combine; // placeholder for actual hashing
        api.assert_is_equal(hash_result, s);
    }
}

pub async fn generate_witness(params: web::Json<WitnessRequest>) -> impl Responder {
    // Execute the compliance circuit
    let compile_result = compile(&FileCircuit::default(), CompileOptions::default())
        .map_err(|e| actix_web::error::ErrorInternalServerError(e))
        .unwrap();

    //  let active_compliance = BN254::from(0_u32);
    //  let file_hash: [u8; 32] = compute_sha256_hash_of_file(&params.f).unwrap();
    let file_hash: &[u8; 32] = params.f.as_bytes().try_into().unwrap();
    let r: &[u8; 32] = params.r.as_bytes().try_into().unwrap();
    let s: &[u8; 32] = params.s.as_bytes().try_into().unwrap();
    let assignment = FileCircuit {
        f: M31::from_uniform_bytes(file_hash),
        r: M31::from_uniform_bytes(r),
        s: M31::from_uniform_bytes(s),
    };
    //  assignment.target = BN254::from(params.target);

    // Generate witness
    let witness = compile_result.witness_solver
        .solve_witness(&assignment)
        .map_err(|e| actix_web::error::ErrorInternalServerError(e))
        .unwrap();

    // Serialize witness to bytes
    let mut buffer = Vec::new();
    witness
        .serialize_into(&mut buffer)
        .map_err(|e| actix_web::error::ErrorInternalServerError(e))
        .unwrap();

    HttpResponse::Ok().content_type("application/octet-stream").body(buffer)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Web Server Started on http://localhost:3031");
    HttpServer::new(|| {
        App::new().service(
            web::resource("/generate-witness").route(web::post().to(generate_witness))
        )
    })
        .bind("127.0.0.1:3031")?
        .run().await
}
