import { Web3 } from "web3"
// import vaultAbi from "./contract/vault.json"
import marketplaceAbi from "./contract/marketplace.json"
import factoryAbi from "./contract/factory.json"
import entryAbi from "./contract/entry.json"


let web3;
const providerRpc = process.env.NEXT_PUBLIC_PROVIDER_RPC as string
let vault;
// const vaultAddress = process.env.VAULT_ADDRESS
let marketplace;
const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS
let factory;
const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS
let entry;
const entryAddress = process.env.NEXT_PUBLIC_ENTRY_ADDRESS

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
   // web3 = new Web3(window.ethereum)
   // const provider = new Web3.providers.HttpProvider(providerRpc);
   web3 = new Web3(providerRpc)
   // vault = new web3.eth.Contract(vaultAbi, vaultAddress)
   marketplace = new web3.eth.Contract(marketplaceAbi, marketplaceAddress)
   factory = new web3.eth.Contract(factoryAbi, factoryAddress)
   entry = new web3.eth.Contract(entryAbi, entryAddress)
} else {
   const provider = new Web3.providers.HttpProvider(providerRpc);
   web3 = new Web3(provider)
   // vault = new web3.eth.Contract(vaultAbi, vaultAddress)
   marketplace = new web3.eth.Contract(marketplaceAbi, marketplaceAddress)
   factory = new web3.eth.Contract(factoryAbi, factoryAddress)
   entry = new web3.eth.Contract(entryAbi, entryAddress)
}

export { web3, vault, marketplace, factory, entry }