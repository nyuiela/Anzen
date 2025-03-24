"use client"
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import vaultAbi from "../vault.json"
import Web3 from "web3";
import { Button } from "../ui/button";

let invoices = [
   {
      name: "",
      address: ""
   }

]


export function VaultTable({ address }: { address: string[] }) {
   invoices = [];
   const [metadata, setMetadata] = useState<any[]>([]);
   // const add = ["0x9C7E17872bed0dfA19697d642B782eEc63a87d9e"]
   address.map((item,) => invoices.push({
      name: item,
      address: item
   }))

   async function getMeta() {
      const providerRpc = process.env.NEXT_PUBLIC_PROVIDER_RPC as string
      const web3 = new Web3(providerRpc)
      const cvault = new web3.eth.Contract(vaultAbi, "0x07F264E0AeB84b212416e3258FAB6D47D00Ff804")
      const store = await cvault.methods.store("kaleel", "0xa833f191994700434a0f5506fa7493478c31b1341b61f742b0e7061141aaddc2", {
         dateUploaded: 0,
         lastModified: 0
      }).call({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' })
      const med = await cvault.methods.metadata().call()
      console.log("store", med)

      // const file = await cvault.methods.getFile
   }

   const getDate = (timestamp: number) => new Date(timestamp * 1000);

   useEffect(() => {
      async function getMeta() {
         address.map(async (item) => {
            const providerRpc = process.env.NEXT_PUBLIC_PROVIDER_RPC as string
            const web3 = new Web3(providerRpc)
            const cvault = new web3.eth.Contract(vaultAbi, item)
            const med = await cvault.methods.metadata().call()
            console.log("store", med)
            setMetadata(meta => [...meta, med]);
         });
      }
      getMeta()
   }, [address])
   return (
      <Table>
         {/* <Button onClick={getMeta}>Click</Button> */}
         <TableCaption>A list of your vaults.</TableCaption>
         <TableHeader>
            <TableRow>
               <TableHead className="w-[100px]">Vault Name</TableHead>
               <TableHead>Files</TableHead>
               <TableHead>Folders</TableHead>
               <TableHead>Address</TableHead>
               <TableHead>Date</TableHead>
               {/* <TableHead>Method</TableHead> */}
               {/* <TableHead className="text-right">Amount</TableHead> */}
            </TableRow>
         </TableHeader>
         <TableBody>
            {metadata.map((meta, key) => (
               <TableRow key={meta.name}>
                  <a>
                     <TableCell className="font-medium">
                        {meta.name}
                     </TableCell>
                  </a>
                  <TableCell>{meta?.files}</TableCell>
                  <TableCell>{meta?.folders}</TableCell>
                  <TableCell>{address[key]}</TableCell>
                  <TableCell>{`${getDate(Number(meta?.dateCreated) || 0)}`}</TableCell>
                  {/* <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
               </TableRow>
            ))}
         </TableBody>
         <TableFooter>
            {/* <TableRow>
               <TableCell colSpan={3}>Total</TableCell>
               <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow> */}
         </TableFooter>
      </Table>
   )
}

