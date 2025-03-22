// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { CreateGroup, UserProfile } from "../src/dataStructures/DataStructure.sol";

interface IEntry {
    // Enum for privacy settings (assuming it's defined in DataStructure.sol)
    enum PRIVACY {
        PUBLIC,
        PRIVATE
    }

    // Function to connect a new user
    function connect(string memory _userName, uint256 _tokenId, PRIVACY _privacy) external;

    // Function to create a new group
    function createGroup(string memory _name, address[] memory members, uint256 _tokenId, PRIVACY _privacy) external;

    // Function to update user profile
    function updateUserProfile(string memory _username, uint256 _tokenId, PRIVACY _privacy) external;

    // Function to get user profile
    function getProfile() external view returns (UserProfile memory);

    // Function to request access to another user's profile
    function requestAccessToProfile(address _user) external;

    // Function to accept a request for profile access
    function acceptRequest(address _user) external;

    // Function to remove access to a profile
    function removeFromProfileAccess(address _user) external;

    // Function to update profile picture
    function updateProfilePicture(uint256 _tokenId) external;
}