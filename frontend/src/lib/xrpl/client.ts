import { Client } from "xrpl";

const networks = {
   RIPPLE_TESTNET: "wss://s.altnet.rippletest.net:51233/"
}
let client: Client

export function getClient() {
   if (!client) {
      client = new Client(networks.RIPPLE_TESTNET);
   }
   return client
}
