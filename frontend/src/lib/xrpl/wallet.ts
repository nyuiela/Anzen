import { Wallet } from "xrpl"

const wallet_1_seed = process.env.WALLET_1_SEED || ""
const wallet_2_seed = process.env.WALLET_2_SEED || ""

export const wallet_1 = Wallet.fromSeed(wallet_1_seed)
export const wallet_2 = Wallet.fromSeed(wallet_2_seed)