// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Script} from "forge-std/Script.sol";
import {Entry} from "../src/entry.sol";
import {MarketPlace} from "../src/MarketPlace.sol";
import {Vault} from "../src/vault.sol";
import {VaultFactory} from "../src/VaultFactory.sol";

contract DeployScript is Script {
    Entry entry;
    MarketPlace market;
    //  Vault vault;
    VaultFactory factory;
    address quoteAssetAddress;

    function run() public {
        //   string owner = vm.envString("ADDR");
        vm.createSelectFork("sidechain");
        vm.startBroadcast();
        entry = new Entry();

        market = new MarketPlace(msg.sender, quoteAssetAddress);
        //   vault = new Vault(msg.sender);
        factory = new VaultFactory(address(entry));
        vm.stopBroadcast();
    }
}
