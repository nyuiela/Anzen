import bee from "@/lib/bee";
import { NextResponse } from "next/server";

// const postageBatchId = "ab1b6efd6c45f05a18f5322ccb8a7c7c02140fd6879cdd5b7d2e2fbf60fd2bd3"
export const config = {
   api: {
      bodyParser: false, // Disable default body parsing
   },
};

export async function POST(req: Request) {

   try {
      // Parse the incoming form data
      const formData = await req.formData();
      const file = formData.get("file") as File; // Get the 'file' field from FormData

      if (!file || !file.name) {
         return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
      }

      // Save the file to the 'public/uploads' directory

      const postageBatchId = await bee.createPostageBatch("17463640064", 17)
      const result = await bee.uploadFile(postageBatchId, file, file.name)
      console.log(result)


      // generate witness file
      const witnessResponse = await fetch("http://localhost:3031/generate-witness", {
         method: "POST",
         body: JSON.stringify({
            f: "a",
            r: "a",
            s: "a"
         })
      })
      const arrayBuffer = await witnessResponse.arrayBuffer();
      const hexString = Array.from(new Uint8Array(arrayBuffer), byte => byte.toString(16).padStart(2, '0')).join('');
      console.log("Hex Witness:", hexString);

      // Convert hex to bytes32 (pad to 64 characters)
      const witnessHash = `0x${hexString.padEnd(64, '0').slice(0, 64)}`;
      console.log("Bytes32 Witness:", witnessHash);

      return NextResponse.json({
         success: "true",
         fileName: file.name,
         witnessHash: witnessHash,
         postageBatchId: postageBatchId,
         data: result,
      }, { status: 200 })
   } catch (error) {
      console.log(error)
      return NextResponse.json({
         success: "false",
         error: (error as Error).message || ""
      }, { status: 500 })
   }

}