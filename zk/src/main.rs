#![allow(unused)]
use core::hash;
use std::{ hash::{ DefaultHasher, Hasher }, ptr::hash };

use actix_web::web::Json;
use ::serde::Serialize;
use serde_json::{ self as s_json, to_string };
use expander_compiler::{
    circuit::ir::common::serde,
    frontend::{ extra::debug_eval, * },
    utils::serde::Serde,
};

declare_circuit!(FileCircuit {
    f: PublicVariable, // fileHash: stored in smart contract
    r: Variable, // reference: returned by swarm
    s: Variable, // secretFileHash: provided by user
});

impl Define<BN254Config> for FileCircuit<Variable> {
    fn define<Builder: RootAPI<BN254Config>>(&self, api: &mut Builder) {
        let mut f: Variable = self.f;
        let mut r: Variable = self.r;
        let mut s: Variable = self.s;

        let mut combine = api.add(f, r);
        // In a real ZK circuit, you would use a cryptographic hash function
        // that's compatible with the circuit's operations
        let hash_result = combine; // placeholder for actual hashing
        api.assert_is_equal(hash_result, s);
    }
}

fn main() {
    let compile_result = compile(&FileCircuit::default(), CompileOptions::default()).unwrap();

    let active_compliance = BN254::from(0_u32);
    let mut assignment = FileCircuit {
        f: active_compliance,
        r: active_compliance,
        s: BN254::from(2_u32),
    };
    assignment.s = active_compliance.add(&active_compliance);

    let witness = compile_result.witness_solver.solve_witness(&assignment).unwrap();
    println!("Witness: {:?}", witness);
    // india - 3am - Ghana - 9:29pm
    let file = std::fs::File::create("circuit.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    compile_result.layered_circuit.serialize_into(writer);

    let run_result = compile_result.layered_circuit.run(&witness);
    println!("Run result: {:?}", run_result);
    let file = std::fs::File::create("witness.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    witness.serialize_into(writer);

    debug_eval(&FileCircuit::default(), &assignment, EmptyHintCaller);
}
