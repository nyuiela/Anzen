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

      // const postageBatchId = await bee.createPostageBatch("17463640064", 17)
      // "8040cd4dae5d3e46301db20c7a06c23f13770bea6bf4048c8f4555907c78ecb0"
      // const result = await bee.uploadFile(postageBatchId, file, file.name)
      // console.log(result)


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
      console.log(arrayBuffer)
      const hexString = Array.from(new Uint8Array(arrayBuffer), byte => byte.toString(16).padStart(2, '0')).join('');
      console.log("Hex Witness:", hexString);

      // Send to verification server
      // const verificationResponse = await fetch("http://localhost:3034/prove", {
      //    method: "POST",
      //    headers: {
      //       "Content-Type": "application/octet-stream" // Binary data format
      //    },
      //    body: JSON.stringify({
      //       data: arrayBuffer
      //    })  // Send raw binary data
      // });


      const verifyResponse = await fetch('http://127.0.0.1:3030/prove', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': arrayBuffer.byteLength.toString()
         },
         body: new Uint8Array(arrayBuffer)
      });


      const result = await verifyResponse.json();
      console.log("Verification Result:", result);

      function witnessHashToArrayBuffer(witnessHash) {
         // Remove 0x prefix
         const hex = witnessHash.replace(/^0x/, '');

         // Convert hex string to byte array
         const bytes = new Uint8Array(hex.length / 2);
         for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
         }

         return bytes.buffer;
      }

      // Usage example:


      // Convert hex to bytes32 (pad to 64 characters)
      const witnessHash = `0x${hexString.padEnd(64, '0').slice(0, 64)}`;
      console.log("Bytes32 Witness:", witnessHash);
      const arrayBufferR = witnessHashToArrayBuffer(witnessHash);
      console.log("Array Buffer R", arrayBufferR)

      return NextResponse.json({
         success: "true",
         fileName: file.name,
         witnessHash: witnessHash,
         // postageBatchId: postageBatchId,
         // data: result,
      }, { status: 200 })
   } catch (error) {
      console.log(error)
      return NextResponse.json({
         success: "false",
         error: (error as Error).message || ""
      }, { status: 500 })
   }

}