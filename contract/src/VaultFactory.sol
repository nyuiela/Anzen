//SPDX-License-Identifier: MIT
pragma solidity 0.8.28;
import "./vault.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/clones.sol";
import {IEntry} from "./interface/IEntry.sol";

contract VaultFactory is Ownable {
    using Clones for address;
    Vault private vault;
    IEntry private entry;

    constructor(address entryAddress) Ownable(msg.sender) {
        vault = new Vault(msg.sender);
        entry = IEntry(entryAddress);
    }

    //  event VaultCreate(address owner);
    event SetEntry(address entry, uint256 date);

    //  enum VaultType {
    //      PERSONAL,
    //      GROUP
    //  }

    function createVault() public returns (address) {
        address newVault = address(vault).clone();
        return newVault;
    }

    function setEntry(address entryAddress) external onlyOwner {
        entry = IEntry(entryAddress);
        emit SetEntry(entryAddress, block.timestamp); // which date?
    }

    //  function DeleteVault() public {}
}
