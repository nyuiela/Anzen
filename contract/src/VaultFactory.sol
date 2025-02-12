//SPDX-License-Identifier: MIT
pragma solidity 0.8.28;
import "./vault.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/clones.sol";

contract VaultFactory is Ownable {
    using Clones for address; //thanks love.welcomeeeeeeeeeeee
    Vault private vault;

    constructor() Ownable(msg.sender) {
        vault = new Vault(msg.sender);
    }

    struct UserProfile {
        string username;
        uint256 tokenId; // nftProfile id.
        address owner;
        address[] vaults;
    }

    //  mapping()

    function createVault() public {
        address newVault = address(vault).clone();
    }
}
