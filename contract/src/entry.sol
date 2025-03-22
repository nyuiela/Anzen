//SPDX-License-Identifier: MIT
pragma solidity 0.8.28;
import {DataStructure} from "./dataStructures/DataStructure.sol";

contract Entry is DataStructure {
    // using DataStructure for DataStructure.CreateGroup;
    //using DataStructure for DataStructure.UserProfile;
    uint256 nextGroupId;

    mapping(address => UserProfile) public users;
    mapping(address => bool) public isMemberOf;
    mapping(address => mapping(address => bool)) private access;
    mapping(address => address[]) private requests;
    mapping(string => bool) private usernames;
    mapping(uint256 => CreateGroup) private group;

    modifier isNewUser(address) {
        require(
            !users[msg.sender].exists,
            "Entry__Can_Not_Register_Same_account_Twice"
        );
        _;
    }
    modifier onlyAccountOwner() {
        require(users[msg.sender].owner == msg.sender, "Entry__Must_Be_Owner");
        _;
    }

    constructor() {}

    event UserRegistered(address indexed user, string username);
    event AccessGranted(address owner, address user);

    function connect(
        string memory _userName,
        uint256 _tokenId,
        PRIVACY _privacy
    ) external isNewUser(msg.sender) {
        require(!usernames[_userName], "Entry__UserName_Taken");

        users[msg.sender] = UserProfile({
            username: _userName,
            tokenId: _tokenId,
            owner: msg.sender,
            exists: true,
            vaults: new address[](0),
            privacy: _privacy
        });
        //  users[msg.sender] = profile;
        usernames[_userName] = true;
        emit UserRegistered(msg.sender, _userName);
        //  exists = true;
    }

    function addVaultToUser(
        address _user,
        address _vaultAddress
    ) external /*onlyAuthorized*/ {
        users[_user].vaults.push(_vaultAddress);
    }

    function addVaultToGroup(
        uint256 _groupId,
        address _vaultAddress
    ) external /*onlyAuthorized*/ {
        group[_groupId].vaults.push(_vaultAddress);
    }

    function createGroup(
        string memory _name,
        address[] calldata members,
        uint256 _tokenId,
        PRIVACY _privacy
    ) external {
        CreateGroup memory _group = CreateGroup({
            name: _name,
            members: members,
            tokenId: _tokenId,
            vaults: new address[](0),
            privacy: _privacy
        });
        nextGroupId++;
        group[nextGroupId] = _group;
    }

    function joinPublicGroup(uint256 _groupId) external {
        CreateGroup storage _group = group[_groupId];
        require(
            _group.privacy == PRIVACY.PUBLIC,
            "Entry__Cannot_Join_Private_Group"
        );
        _group.members.push(msg.sender);
    }

    function updateUserProfile(
        string memory _username,
        uint256 _tokenId,
        PRIVACY _privacy
    ) external onlyAccountOwner {
        require(!usernames[_username], "Entry__UserName_Taken");

        usernames[users[msg.sender].username] = false;

        users[msg.sender].username = _username;
        users[msg.sender].tokenId = _tokenId;
        users[msg.sender].privacy = _privacy;
        usernames[_username] = true;
    }

    function getProfile() external view returns (UserProfile memory) {
        return users[msg.sender];
    }

    event AccessRequested(address indexed requester, address indexed target);

    function requestAccessToProfile(address _user) internal onlyAccountOwner {
        require(users[_user].exists, "Entry__User_Does_Not_Exist");
        requests[_user].push(msg.sender);

        // access[msg.sender][_user] = true;
        emit AccessRequested(msg.sender, _user);
    }

    function acceptRequest(address _user) external onlyAccountOwner {
        address[] storage _request = requests[msg.sender];
        for (uint256 i = 0; i < _request.length; i++) {
            if (_request[i] == _user) {
                access[msg.sender][_user] = true;
                emit AccessGranted(msg.sender, _user);

                // Remove the request
                //[3,4,5,6,9,]
                //re[2] = re[5-1]
                // re[2] = 9
                _request[i] = _request[_request.length - 1];
                _request.pop();
                break;
            }
        }
    }

    function removeFromProfileAccess(address _user) external onlyAccountOwner {
        access[msg.sender][_user] = false;
    }

    function updateProfilePicture(uint256 _tokenId) external onlyAccountOwner {
        users[msg.sender].tokenId = _tokenId;
    }
}