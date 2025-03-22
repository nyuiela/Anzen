// use std::{ fs, io::Cursor, process::exit, sync::{ Arc, Mutex } };
use std::{ fs, io::Cursor };

use arith::{ Field, FieldSerde, FieldSerdeError };
use circuit::Circuit;
// use clap::{ Parser, Subcommand };
// use config::{ Config, };
// use gkr_field_config::FieldType;
use gkr_field_config::GKRFieldConfig;
// use mpi_config::MPIConfig;
use poly_commit::expander_pcs_init_testing_only;
use rand::SeedableRng;
use rand_chacha::ChaCha12Rng;
use config::{
    Config,
    GKRConfig,
    //  SENTINEL_BN254,
    //  SENTINEL_GF2,
    //  SENTINEL_M31,
    //  PolynomialCommitmentType,
    //  GKRScheme,
    //  BN254ConfigSha2Raw,
    //  gkr_field_config::BN254Config,
};
// use gkr_field_config::BN254Config;
// use gkr::BN254ConfigSha2Raw;

// use log::info;
use transcript::Proof;
// use warp::{ http::StatusCode, reply, Filter };
const PCS_TESTING_SEED_U64: u64 = 114514;
pub fn prove<Cfg: GKRConfig>(
    circuit: &mut Circuit<Cfg::FieldConfig>,
    config: &Config<Cfg>
) -> (<<Cfg as GKRConfig>::FieldConfig as GKRFieldConfig>::ChallengeField, Proof) {
    let mut prover = gkr::Prover::new(config);
    prover.prepare_mem(circuit);
    // TODO: Read PCS setup from files

    let mut rng = ChaCha12Rng::seed_from_u64(PCS_TESTING_SEED_U64);

    let (pcs_params, pcs_proving_key, _pcs_verification_key, mut pcs_scratch) =
        expander_pcs_init_testing_only::<Cfg::FieldConfig, Cfg::Transcript, Cfg::PCS>(
            circuit.log_input_size(),
            &config.mpi_config,
            &mut rng
        );

    prover.prove(circuit, &pcs_params, &pcs_proving_key, &mut pcs_scratch)
}
// use config::{ Config, PolynomialCommitmentType, GKRScheme };
pub fn g_prove<Cfg: GKRConfig>(
    circuit_file: &str,
    witness_file: &str,
    output_proof_file: &str,
    config: Config<Cfg>
) -> bool {
    let mut circuit = Circuit::<Cfg::FieldConfig>::load_circuit::<Cfg>(&circuit_file);
    circuit.prover_load_witness_file(&witness_file, &config.mpi_config);
    let (claimed_v, proof) = prove(&mut circuit, &config);

    if config.mpi_config.is_root() {
        let bytes = dump_proof_and_claimed_v(&proof, &claimed_v).expect(
            "Unable to serialize proof."
        );
        fs::write(output_proof_file, bytes).expect("Unable to write proof to file.");
    }
    return true;
}

pub fn dump_proof_and_claimed_v<F: Field>(
    proof: &Proof,
    claimed_v: &F
) -> Result<Vec<u8>, FieldSerdeError> {
    let mut bytes = Vec::new();

    proof.serialize_into(&mut bytes)?;
    claimed_v.serialize_into(&mut bytes)?;

    Ok(bytes)
}

pub fn verify_prove<Cfg: GKRConfig>(
    circuit_file: &str,
    witness_file: &str,
    input_proof_file: &str,
    mpi_size: u32,
    mut config: Config<Cfg>
) {
    assert!(config.mpi_config.world_size() == 1, "Do not run verifier with mpiexec.");
    config.mpi_config.world_size = mpi_size as i32;

    let mut circuit = Circuit::<Cfg::FieldConfig>::load_circuit::<Cfg>(circuit_file);
    circuit.verifier_load_witness_file(&witness_file, &config.mpi_config);

    let bytes = fs::read(&input_proof_file).expect("Unable to read proof from file.");
    let (proof, claimed_v) = load_proof_and_claimed_v(&bytes).expect(
        "Unable to deserialize proof."
    );

    assert!(verify(&mut circuit, &config, &proof, &claimed_v));

    println!("success");
}

pub fn verify<Cfg: GKRConfig>(
    circuit: &mut Circuit<Cfg::FieldConfig>,
    config: &Config<Cfg>,
    proof: &Proof,
    claimed_v: &<<Cfg as GKRConfig>::FieldConfig as GKRFieldConfig>::ChallengeField
) -> bool {
    // TODO: Read PCS setup from files
    let mut rng = ChaCha12Rng::seed_from_u64(PCS_TESTING_SEED_U64);

    let (pcs_params, _pcs_proving_key, pcs_verification_key, mut _pcs_scratch) =
        expander_pcs_init_testing_only::<Cfg::FieldConfig, Cfg::Transcript, Cfg::PCS>(
            circuit.log_input_size(),
            &config.mpi_config,
            &mut rng
        );
    let verifier = gkr::Verifier::new(config);
    let public_input = circuit.public_input.clone();
    verifier.verify(circuit, &public_input, claimed_v, &pcs_params, &pcs_verification_key, proof)
}

pub fn load_proof_and_claimed_v<F: Field>(bytes: &[u8]) -> Result<(Proof, F), FieldSerdeError> {
    let mut cursor = Cursor::new(bytes);

    let proof = Proof::deserialize_from(&mut cursor)?;
    let claimed_v = F::deserialize_from(&mut cursor)?;

    Ok((proof, claimed_v))
}
