//SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract DataStructure {
    // mapping(address => VaultParam)
    struct UserProfile {
        string username;
        uint256 tokenId; // nftProfile id.
        address owner;
        bool exists;
        address[] vaults;
        Privacy privacy;
    }

    struct File {
        string name;
        bytes32 id;
        address owner;
        bytes32 swarmHashEncrypted;
        MetaData metadata;
    }

    struct BatchFile {
        string name;
        bytes32 id;
        address owner;
        bytes32[] swarmHashEncrypted;
        // uint256[] files;
        MetaData metadata;
        // access to file
    }
    // vault -> folder and File seperate

    struct Vault {
        address owner;
        VaultData[] data; //ref to each file / folder.
    } // not exposed

    struct VaultData {
        bytes32 id; // not too sure
        string dataType; //file or folder
        bytes32 ref;
    }

    struct MetaData {
        //string name;
        uint256 dateUploaded;
        uint256 lastModified;
    }
    enum Privacy {
        PUBLIC,
        PRIVATE
    }

    struct CreateGroup {
        string name;
        address[] members;
        uint256 tokenId;
        address[] vaults;
        Privacy privacy;
    }

    //mapping(fileId => accessToken) private access;
}
