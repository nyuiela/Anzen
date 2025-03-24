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

    constructor(
        address entryAddress
    )
        //   address vaultAddress
        Ownable(msg.sender)
    {
        vault = new Vault();
        entry = IEntry(entryAddress);
    }

    //  event VaultCreate(address owner);
    event SetEntry(address entry, uint256 date);

    //  enum VaultType {
    //      PERSONAL,
    //      GROUP
    //  }
    event VaultCreated(address owner, address clone, string name);

    function createVault(address _owner, string calldata _name) external {
        address clone = address(vault).clone();
        //   (bool success, bytes memory data) = clone.call(
        //       abi.encodeWithSelector(Vault.initialize.selector, _owner)
        //   );
        Vault(clone).initialize(_owner, _name);
        //   require(success, "Vault initialization failed"); // Explicit error
        emit VaultCreated(_owner, clone, _name); // Emit the event
    }

    function setEntry(address entryAddress) external onlyOwner {
        entry = IEntry(entryAddress);
        emit SetEntry(entryAddress, block.timestamp); // which date?
    }

    //  function DeleteVault() public {}
}
