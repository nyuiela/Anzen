//SPDX-License-Identifier: MIT
pragma solidity 0.8.28;
import "./dataStructures/DataStructure.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vault is DataStructure, Ownable {
    //    ## vault --- cloned
    // - createVault() //multiple vaults
    // - upload()
    // - download()
    // - ListVaults() onlyOwner() ---- getter function
    // - getFile(vaultId, dataId, accesscode)
    // - getFolder(vaulId, dataId[], accesscode);
    // -  removeVault
    // -  removeData
    // -  removefolder
    // - generateAccessCodes(vaultId,data/data[], user);
    address private owner;

    // bool addToFolder;

    constructor(address _owner) Ownable(_owner) {
        owner = _owner;
    }

    mapping(bytes32 => File) private file;
    //  mapping(bytes => Folder)[] private folder;
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
    ) public {
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

    //   uint256[] folder;

    //function createFolder() external{}

    function batchStore(
        string[] memory _name,
        /*bytes32 _id,*/ bytes32[] calldata _swarmHashEncrypted,
        MetaData calldata _metadata
    ) external {
        for (uint256 i = 0; i < _swarmHashEncrypted.length; i++) {
            store(_name[i], _swarmHashEncrypted[i], _metadata);
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

        //both owner and allowed people
        //chec
        // require(accessCodes.)
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
        return code;
    }
}
