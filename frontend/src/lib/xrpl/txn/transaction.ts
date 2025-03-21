import { Payment } from "xrpl";
import { getClient } from "../client";
import { TxnOptions } from "../models/txn_options";

const client = getClient()


type PaymentProps = Omit<Payment, "TransactionType" | "Account">

export const sendTransaction = async (props: PaymentProps, { wallet }: TxnOptions) => {
   const payment: Payment = {
      ...props,
      TransactionType: "Payment",
      Account: wallet.address
   }
   const prepared = await client.autofill(payment)

   // sign txn
   const signed = wallet.sign(prepared)

   // submit
   const response = await client.submitAndWait(signed.tx_blob)
   console.log(response)
   return response
}