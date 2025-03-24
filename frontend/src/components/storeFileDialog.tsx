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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomButton from "./customButton"
import { entry } from "@/backend/web3"
import UploadFile from "./upload"


export function StoreFileDialog({ vault = "" }: { vault: string }) {
   const [value, setValue] = useState({
      name: "",
      members: "",
      tokenId: 0,
      privacy: 0
   })
   const handleChange = (e: any) => {
      if (e.target.name == "members") setValue((value: any) => ({ ...value, [e.target.name]: [...value.members, e.target.value] }))
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }

   async function click() {
      let members = value.members.split(",");
      console.log(members)
      const txReceipt = await entry.methods.createGroup(value.name, members, value.tokenId, value.privacy).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' })
      console.log(txReceipt)
      const groupId = await txReceipt.events.GroupCreated.returnValues.id;
      console.log("GroupId: ", groupId)
   }


   const handleSelectChange = (selectedValue: string) => {
      setValue((prevValue) => ({ ...prevValue, privacy: selectedValue }))
   }
   console.log(value)

   return (
      <Dialog>
         <DialogTrigger asChild>
            {/* <Button variant="outline">Edit Profile</Button> */}
            <Button size="lg" className='cursor-pointer' asChild>
               <p>
                  Store File
               </p>
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>

            </DialogHeader>
            <div className="grid gap-4 py-4">

               <UploadFile vault={""} />

            </div>
            <DialogFooter>
               <CustomButton label="Verify Proof" click={click} />
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
