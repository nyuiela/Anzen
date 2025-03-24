"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomButton from "./customButton"
import { entry, factory, vault } from "@/backend/web3"
import { useSelector } from "react-redux"
export function VaultDialog() {
   const user = useSelector((state) => state.account);
   console.log("User vault: ", user)
   const [value, setValue] = useState({
      name: ""
   })
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }

   async function click() {
      // const user = useSelector((state) => state.account);
      console.log("User vault: ", user)
      const txReceipt = await factory.methods.createVault('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', value.name)
         // .send()
         .send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' })
      console.log(txReceipt)
      const vaultAddress = txReceipt.events.VaultCreated.returnValues.clone;
      console.log("Vault Address:", vaultAddress);

      // console.log("Vault Address ", vaultAddress)
      const added = await entry.methods.addVaultToUser(vaultAddress).send({
         from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
      })
      console.log(added)

   }


   // const handleSelectChange = (selectedValue: string) => {
   //    setValue((prevValue) => ({ ...prevValue, privacy: selectedValue }))
   // }

   return (
      <Dialog>
         <DialogTrigger asChild>
            {/* <Button variant="outline">Edit Profile</Button> */}
            <Button size="lg" className='cursor-pointer' asChild>
               <p>
                  Create Vault
               </p>
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Vault</DialogTitle>
               <DialogDescription>
                  Welcome
               </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Name
                  </Label>
                  <Input id="name" name="name" placeholder={"kaleel"} onChange={(e) => handleChange(e)} className="col-span-3" />
               </div>

            </div>
            <DialogFooter>
               <CustomButton label="Create Vault" click={click} />
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
