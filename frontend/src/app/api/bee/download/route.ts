import bee from "@/lib/bee";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
   const { searchParams } = new URL(req.url)
   const reference = searchParams.get("reference")
   console.log(reference)
   // const reference = "b4191d0737962fd36c1c514fe4b272c97ba0d4485da82d005c5b21b28b2745de"
   const retrievedFile = await bee.downloadFile(reference as string)
   console.log(retrievedFile)

   return NextResponse.json({
      data: retrievedFile
   })

}