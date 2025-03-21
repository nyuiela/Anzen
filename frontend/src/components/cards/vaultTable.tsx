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

let invoices = [
   {
      name: "",
      address: ""
   }

]


export function VaultTable({ address }: { address: string[] }) {
   invoices = []
   address.map((item, key) => invoices.push({
      name: `Vault00${key}`,
      address: item
   }))
   return (
      <Table>
         <TableCaption>A list of your recent invoices.</TableCaption>
         <TableHeader>
            <TableRow>
               <TableHead className="w-[100px]">Vault Name</TableHead>
               <TableHead>Address</TableHead>
               {/* <TableHead>Method</TableHead> */}
               {/* <TableHead className="text-right">Amount</TableHead> */}
            </TableRow>
         </TableHeader>
         <TableBody>
            {invoices.map((invoice) => (
               <TableRow key={invoice.name}>
                  <a>
                     <TableCell className="font-medium">
                        {invoice.name}
                     </TableCell>
                  </a>
                  <TableCell>{invoice.address}</TableCell>
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

