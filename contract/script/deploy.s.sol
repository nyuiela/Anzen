// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";
import {Entry} from "../src/entry.sol";
import {MarketPlace} from "../src/MarketPlace.sol";
import {Vault} from "../src/vault.sol";
import {VaultFactory} from "../src/VaultFactory.sol";

contract DeployScript is Script {
    Entry entry;
    MarketPlace market;
    Vault vault;
    VaultFactory factory;
    address quoteAssetAddress;

    function run() public {
        //   string owner = vm.envString("ADDR");
        //   vm.createSelectFork("sidechain");
        vm.createSelectFork("localchain");
        vm.startBroadcast();
        entry = new Entry();

        market = new MarketPlace(msg.sender, quoteAssetAddress);
        vault = new Vault();
        factory = new VaultFactory(address(entry));
        vm.stopBroadcast();
        console.log("NEXT_PUBLIC_ENTRY_ADDRESS=", address(entry));
        console.log("NEXT_PUBLIC_MARKETPLACE_ADDRESS=", address(market));
        console.log("NEXT_PUBLIC_VAULT_ADDRESS=", address(vault));
        console.log("NEXT_PUBLIC_FACTORY_ADDRESS=", address(factory));
    }
}
