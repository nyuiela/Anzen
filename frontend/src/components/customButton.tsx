"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
export default function CustomButton({ label, click }: { label?: string, click?: Function }) {
   const [disabled, setDisable] = useState<boolean>()
   const handleClick = () => {
      setDisable(true)
      try {
         if (click) click();
         // setDisable()
      } catch (error) {
         console.log(error)
      }
      setDisable(false)
   }
   return (
      <Button type="submit" onClick={handleClick} disabled={disabled}>{label ? label :
         "Submit"}</Button>
   )
}