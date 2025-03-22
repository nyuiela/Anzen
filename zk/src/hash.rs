#![allow(unused)]
use std::{ fs::File, io::Read };
use anyhow::Result;
use sha2::{ Sha256, Digest };

pub fn compute_sha256_hash_of_file(file: &File) -> Result<[u8; 32]> {
    //  let mut file = File::open(file_path)?;
    let mut file = file;
    let mut hasher = Sha256::new();
    let mut buffer = [0; 4096];

    loop {
        let bytes_read = file.read(&mut buffer)?;
        if bytes_read == 0 {
            break;
        }
        hasher.update(&buffer[..bytes_read]);
    }

    let result = hasher.finalize();
    Ok(result.into())
}

// pub fn compute_merkle_tree_hash(folder_path: &str) -> Result<String> {
//     let mut file_hashes = Vec::new();

//     // Iterate through all files in the folder
//     for entry in std::fs::read_dir(folder_path)? {
//         let entry = entry?;
//         let path = entry.path();

//         if path.is_file() {
//             // Compute hash for each file
//             let file_hash = compute_sha256_hash_of_file(path.to_str().unwrap())?;
//             file_hashes.push(file_hash);
//         }
//     }

//     // Combine hashes to compute Merkle root
//     while file_hashes.len() > 1 {
//         let mut parent_hashes = Vec::new();

//         for chunk in file_hashes.chunks(2) {
//             let combined_hash = if chunk.len() == 2 {
//                 format!("{}{}", chunk[0], chunk[1])
//             } else {
//                 chunk[0].clone()
//             };

//             // Hash the combined hash
//             let mut hasher = Sha256::new();
//             hasher.update(combined_hash);
//             parent_hashes.push(format!("{:x}", hasher.finalize()));
//         }

//         file_hashes = parent_hashes;
//     }

//     // The final hash is the Merkle root
//     Ok(file_hashes.pop().unwrap_or_else(|| String::from("No files found")))
// }
