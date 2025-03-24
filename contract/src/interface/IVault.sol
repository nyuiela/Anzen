// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IVault {
    // Structs
    struct File {
        string name;
        bytes32 id;
        address owner;
        bytes32 swarmHashEncrypted;
        MetaData metadata;
    }

    struct MetaData {
        uint256 dateUploaded;
        uint256 lastModified;
    }

    struct AccessCode {
        bytes32 accesscode;
        uint256 expire;
        GetStatus getStatus;
    }

    struct Folder {
        bytes32[] fileId;
        string foldername;
        address owner;
    }

    struct Metadata {
        string name;
        uint256 dateCreated;
        uint256 files;
        uint256 folders;
    }

    // Enums
    enum GetStatus {
        VIEWONLY,
        DOWNLOADABLE
    }

    // Functions
    function initialize(address _owner, string calldata _name) external;

    function store(
        string memory _name,
        bytes32 _swarmHashEncrypted,
        MetaData memory _metadata
    ) external;

    function batchStore(
        string[] memory _name,
        bytes32[] calldata _swarmHashEncrypted,
        MetaData calldata _metadata
    ) external;

    function createFolder(
        bytes32[] calldata _fileId,
        string memory _foldername
    ) external;

    function addFileToFolder(
        string calldata _foldername,
        bytes32 _fileId
    ) external;

    function removeFileFromFolder(
        string calldata _foldername,
        bytes32 _fileId
    ) external;

    function download(
        bytes32 _fileId,
        bytes32 _accessCode
    ) external view returns (File memory);

    function getFile(
        bytes32 _fileId,
        bytes32 _accessCode
    ) external view returns (File memory);

    function removeFile(bytes32 _fileId) external;

    function removebatchFile(bytes32[] memory _fileId) external;

    function generateAccessCode(
        bytes32 _fileId,
        uint256 _expire,
        GetStatus _getStatus
    ) external returns (bytes32);

    function getMetadata() external view returns (string memory);
}
