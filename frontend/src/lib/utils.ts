import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function arrayBufferToBytes32(arrayBuffer) {
   // Convert ArrayBuffer to hex string
   const hex = Buffer.from(arrayBuffer).toString('hex');

   // Pad to 64 characters (32 bytes)
   const paddedHex = hex.padEnd(64, '0').slice(0, 64);

   return `0x${paddedHex}`;
}



// export function setValue(e) {
//    e.valu
// }