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


export function GroupDialog() {
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
                  Create Group
               </p>
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Group</DialogTitle>
               <DialogDescription>
                  Share memory with friends
               </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">

               {/* string memory _name,
        address[] calldata members,
        uint256 _tokenId,
        PRIVACY _privacy */}
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Group Name
                  </Label>
                  <Input id="groupname" name="groupname" placeholder={"kaleel"} onChange={(e) => handleChange(e)} className="col-span-3" />
               </div>

               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Members
                  </Label>
                  <Input id="members" name="members" placeholder={"0x0"} onChange={(e) => handleChange(e)} className="col-span-3" />
               </div>

               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Profile TokenId
                  </Label>
                  <Input id="tokenId" name="tokenId" placeholder={"0"} onChange={(e) => handleChange(e)} className="col-span-3" />
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
               <CustomButton label="Create Group" click={click} />
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
