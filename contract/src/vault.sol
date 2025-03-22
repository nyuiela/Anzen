//SPDX-License-Identifier: MIT
pragma solidity 0.8.28;
import "./dataStructures/DataStructure.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vault is DataStructure, Ownable {
    address private owner;

    constructor(address _owner) Ownable(_owner) {
        owner = _owner;
    }

    mapping(bytes32 => File) private file;
    enum GetStatus {
        VIEWONLY,
        DOWNLOADABLE
    }
    struct AccessCode {
        bytes32 accesscode;
        uint256 expire;
        GetStatus getStatus;
    }
    mapping(bytes32 => AccessCode[]) private accessCodes;

    function store(
        string memory _name,
        /*bytes32 _id,*/ bytes32 _swarmHashEncrypted,
        MetaData memory _metadata
    ) public onlyOwner {
        _metadata = MetaData({dateUploaded: block.timestamp, lastModified: 0});
        bytes32 _id = keccak256(abi.encodePacked(_name, _swarmHashEncrypted));
        file[_id] = File({
            name: _name,
            id: _id,
            owner: msg.sender,
            swarmHashEncrypted: _swarmHashEncrypted,
            metadata: _metadata
        });
    }

    function batchStore(
        string[] memory _name,
        /*bytes32 _id,*/ bytes32[] calldata _swarmHashEncrypted,
        MetaData calldata _metadata
    ) external onlyOwner {
        for (uint256 i = 0; i < _swarmHashEncrypted.length; i++) {
            store(_name[i], _swarmHashEncrypted[i], _metadata);
        }
    }

    struct Folder {
        bytes32[] fileId;
        string foldername;
        address owner;
        //   bool exist;
    }
    mapping(bytes32 => Folder) private folder;

    function createFolder(
        bytes32[] calldata _fileId,
        string memory _foldername
    ) external onlyOwner {
        // check if user has profil
        bytes32 _folderHash = keccak256(
            abi.encodePacked(msg.sender, _foldername)
        );
        folder[_folderHash] = Folder({
            fileId: _fileId,
            foldername: _foldername,
            owner: msg.sender
            // exist : true
        });
    }

    function addFileToFolder(
        string calldata _foldername,
        bytes32 _fileId
    ) external onlyOwner {
        bytes32 _folderHash = keccak256(
            abi.encodePacked(msg.sender, _foldername)
        );
        require(folder[_folderHash].owner == msg.sender, "Vault__Not_Owner");
        folder[_folderHash].fileId.push(_fileId);
    }

    function removeFileFromFolder(
        string calldata _foldername,
        bytes32 _fileId
    ) external onlyOwner {
        bytes32 _folderHash = keccak256(
            abi.encodePacked(msg.sender, _foldername)
        );
        require(folder[_folderHash].owner == msg.sender, "Vault__Not_Owner");
        //   folder[_folderHash].fileId.push(_fileId);
        bytes32[] storage _files = folder[_folderHash].fileId;
        for (uint256 i; i < _files.length; i++) {
            if (_files[i] == _fileId) {
                _files[i] = _files[_files.length - 1];
                _files.pop();
            }
        }
    }

    function download(
        bytes32 _fileId,
        bytes32 _accessCode /* onlyOwner / authorized */
    ) external returns (File memory) {
        for (uint256 i = 0; i < accessCodes[_fileId].length; i++) {
            if (accessCodes[_fileId][i].accesscode == _accessCode) {
                require(
                    accessCodes[_fileId][i].expire < block.timestamp,
                    "Vault__accessCodeExpired"
                );
                require(
                    accessCodes[_fileId][i].getStatus == GetStatus.DOWNLOADABLE,
                    "Vault__Can_Not_DOWNLOAD"
                );
                return file[_fileId];
            }
        }
    }

    // function listVaults()
    function getFile(
        bytes32 _fileId,
        bytes32 _accessCode
    ) external view returns (File memory) /* onlyOwner authorized */ {
        //require(msg.sender == File.owner || )
        for (uint256 i = 0; i < accessCodes[_fileId].length; i++) {
            if (accessCodes[_fileId][i].accesscode == _accessCode) {
                require(
                    accessCodes[_fileId][i].expire < block.timestamp,
                    "Vault__accessCodeExpired"
                );
                return file[_fileId];
            }
        }
    }

    //  function getFolder() external /* onlyOwner / authorized */ {

    //  }

    // function removeVault() external onlyOwner /* onlyOwner - also in vaultFactory */ {  }

    function removeFile(bytes32 _fileId) public onlyOwner {
        delete file[_fileId];
    }

    function removebatchFile(
        bytes32[] memory _fileId
    ) external onlyOwner /* onlyOwner */ {
        for (uint256 i = 0; i < _fileId.length; i++) {
            removeFile(_fileId[i]);
        }
    }

    function generateAccessCode(
        bytes32 _fileId,
        uint256 _expire /* onlyOwner */,
        GetStatus _getStatus
    ) external onlyOwner returns (bytes32) {
        require(_expire > block.timestamp, "Expire_passed"); //rename error
        bytes32 code = keccak256(abi.encodePacked(block.timestamp, _expire)); // more to be added
        //   accessCodes[_fileId].expire = _expire;
        accessCodes[_fileId].push(
            AccessCode({
                accesscode: code,
                expire: _expire,
                getStatus: _getStatus
            })
        );
        //transfert(msg.sender, address(accescodeContract), code)
        return code;
    }
}