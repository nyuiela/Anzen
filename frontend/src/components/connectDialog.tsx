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

import { entry } from "@/backend/web3"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from 'lucide-react';
import CustomButton from "./customButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useAccount } from "@particle-network/connectkit"

export function ConnectDialog() {
   const [value, setValue] = useState({
      username: "",
      tokenId: 0,
      privacy: ""
   })
   const account = useAccount()
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }

   async function click() {
      const txReceipt = await entry.methods.connect(value.username, value.tokenId, value.privacy).send({ from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" })
      console.log(txReceipt)
   }

   const handleSelectChange = (selectedValue: string) => {
      setValue((prevValue) => ({ ...prevValue, privacy: selectedValue }))
   }
   return (
      <Dialog>
         <DialogTrigger asChild>
            {/* <Button variant="outline">Edit Profile</Button> */}
            <Button size="lg" className='cursor-pointer' asChild>
               <p>

                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
               </p>
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Connect Account</DialogTitle>
               <DialogDescription>
                  Welcome
               </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Username
                  </Label>
                  <Input id="username" name="username" placeholder={"kaleel"} onChange={(e) => handleChange(e)} className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                     tokenId
                  </Label>
                  <Input id="tokenId" placeholder="0" name="tokenId" className="col-span-3" onChange={(e) => handleChange(e)} />
               </div>

               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                     Privacy
                  </Label>
                  <Select name="username" onValueChange={handleSelectChange}>
                     <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Privacy" />
                     </SelectTrigger>
                     <SelectContent >
                        <SelectItem value="0">Public</SelectItem>
                        <SelectItem value="1">Private</SelectItem>
                        {/* <SelectItem value="system">System</SelectItem> */}
                     </SelectContent>
                  </Select>
               </div>


            </div>
            <DialogFooter>
               <CustomButton label="Connect" click={click} />
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
