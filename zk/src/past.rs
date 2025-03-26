#![allow(unused)]
use core::hash;
use std::{ hash::{ DefaultHasher, Hasher }, ptr::hash };

use actix_web::web::Json;
use ::serde::{ Deserialize, Serialize };
use serde_json::{ self as s_json, to_string };
use expander_compiler::{
    circuit::ir::common::serde,
    frontend::{ extra::debug_eval, * },
    utils::serde::Serde,
};

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

impl Define<BN254Config> for FileCircuit<Variable> {
    fn define<Builder: RootAPI<BN254Config>>(&self, api: &mut Builder) {
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
fn main() {
    let compile_result = compile(&FileCircuit::default(), CompileOptions::default())
        .map_err(|e| actix_web::error::ErrorInternalServerError(e))
        .unwrap();

    //  let active_compliance = BN254::from(0_u32);
    //   let file_hash: [u8; 32] = compute_sha256_hash_of_file(&params.f).unwrap();
    let assignment = FileCircuit {
        f: BN254::from(0_u32),
        r: BN254::from(0_u32),
        s: BN254::from(0_u32),
    };
    //  assignment.target = BN254::from(params.target);

    // Generate witness
    let witness = compile_result.witness_solver
        .solve_witness(&assignment)
        .map_err(|e| actix_web::error::ErrorInternalServerError(e))
        .unwrap();

    let file = std::fs::File::create("circuit.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    let _ = compile_result.layered_circuit.serialize_into(writer);

    let run_result = compile_result.layered_circuit.run(&witness);
    println!("Run result: {:?}", run_result);
    let file = std::fs::File::create("witness.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    witness.serialize_into(writer);

    // Serialize witness to bytes
    let mut buffer = Vec::new();
    witness
        .serialize_into(&mut buffer)
        .map_err(|e| actix_web::error::ErrorInternalServerError(e))
        .unwrap();

    debug_eval(&FileCircuit::default(), &assignment, EmptyHintCaller);
}
