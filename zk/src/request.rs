use actix_web::{ web, App, HttpResponse, HttpServer, Responder };
use expander_compiler::{ frontend::*, utils::serde::Serde };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct WitnessRequest {
    a: u32,
    b: u32,
    target: u32,
}

declare_circuit!(ComCircuit {
    a: Variable, // active compliance
    b: Variable,
    target: PublicVariable,
});
impl Define<BN254Config> for ComCircuit<Variable> {
    fn define<Builder: RootAPI<BN254Config>>(&self, api: &mut Builder) {
        let mut a: Variable = self.a;
        let mut b: Variable = self.b;

        for _ in 0..30 {
            let c = api.add(a, b);
            a = b;
            b = c;
            // api.display(&format!("b{}", i), b);
        }
        api.assert_is_equal(b, self.target);
    }
}
pub async fn generate_witness(params: web::Json<WitnessRequest>) -> impl Responder {
    // Execute the compliance circuit
    let compile_result = compile(&ComCircuit::default(), CompileOptions::default())
        .map_err(|e| actix_web::error::ErrorInternalServerError(e))
        .unwrap();

    //  let active_compliance = BN254::from(0_u32);
    let assignment = ComCircuit {
        a: BN254::from(params.a),
        b: BN254::from(params.b),
        target: BN254::from(params.target),
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
    HttpServer::new(|| {
        App::new().service(
            web::resource("/generate-witness").route(web::post().to(generate_witness))
        )
    })
        .bind("127.0.0.1:3031")?
        .run().await
}
