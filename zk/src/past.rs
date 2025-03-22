#![allow(unused)]
use serde_json as s_json;
use expander_compiler::{
    circuit::ir::common::serde,
    frontend::{ extra::debug_eval, * },
    utils::serde::Serde,
};

struct ComplianceData {
    company_id: String, // CIN
    company_name: String, // Company Name
    roc: String, // ROC
    registration_number: BN254, // Registration Number
    incorporation_date: String, // Incorporation Date
    email: String, // Email
    corporate_address: String, // Corporate Address
    listed: BN254, // Listed (boolean as Field)
    company_type: String, // Company Type
    company_category: String, // Company Category
    company_subcategory: String, // Company Subcategory
    company_status: String, // Company Status
    authorized_capital: BN254, // Authorized Capital
    paid_up_capital: BN254, // Paid-up Capital
    last_agm_date: String, // Last AGM Date
    balance_sheet_date: String, // Balance Sheet Date
    active_compliance: String, // Active Compliance
    company_activity: String, // Company Activity
    jurisdiction: String, // Jurisdiction
    regional_director: String, // Regional Director
    mca_id: BN254, // MCA ID
}

fn get_circuit_inputs() {
    let url = "https://0f4aef00-9db0-4057-949e-df6937e3449b.mock.pstmn.io/vernon_mca";
    let response = reqwest::blocking::get(url).expect("Failed to send request");
    let body = response.text().expect("Failed to get response body");
    println!("Body: {}", body);
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

        for i in 0..30 {
            let c = api.add(a, b);
            a = b;
            b = c;
            api.display(&format!("b{}", i), b);
        }
        api.assert_is_equal(b, self.target);
    }
}
fn main() {
    get_circuit_inputs();
    let compile_result = compile(&ComCircuit::default(), CompileOptions::default()).unwrap();

    let active_compliance = BN254::from(0_u32);
    let mut assignment = ComCircuit {
        a: active_compliance,
        b: active_compliance,
        target: BN254::from(2_u32),
    };
    assignment.target = active_compliance;

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

    debug_eval(&ComCircuit::default(), &assignment, EmptyHintCaller);
}
