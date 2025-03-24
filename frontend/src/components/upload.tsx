"use client"
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Upload, Lock, Users, Globe } from 'lucide-react';
import Navbar from '@/components/navbar';
import Web3 from 'web3';
import vaultAbi from "./vault.json"
import { Label } from './ui/label';
import { Input } from './ui/input';

export default function UploadFile({ vault = "" }: { vault: string }) {
   const [uploading, setUploading] = useState(false);
   const [progress, setProgress] = useState(0);
   const [privacy, setPrivacy] = useState<'private' | 'shared' | 'public'>('private');
   const [value, setValue] = useState({
      filename: "",
   })
   const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
      onDrop: (files) => {
         // Handle file upload
         console.log('Files dropped:', files);
      },
   });
   const handleSelectChange = (selectedValue: string) => {
      setValue((prevValue) => ({ ...prevValue, privacy: selectedValue }))
   }
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }


   const handleUpload = async () => {
      if (acceptedFiles.length === 0) return;

      setUploading(true);
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]); // Add the first selected file

      try {
         const response = await fetch("api/bee/upload", {
            method: "POST",
            body: formData,
         });

         if (!response.ok) throw new Error("Failed to upload file");

         const result = await response.json();
         console.log("File uploaded successfully:", result.path);
         const providerRpc = process.env.NEXT_PUBLIC_PROVIDER_RPC as string
         const web3 = new Web3(providerRpc)
         const cvault = new web3.eth.Contract(vaultAbi, vault)
         const txReceipt = await cvault.methods.store(value.filename, result.witnessHash, {
            dateUploaded: Math.floor(Date.now() / 1000),
            lastModified: Math.floor(Date.now() / 1000),
         }, result.data).send({ from: '' })
         console.log(txReceipt)

      } catch (error) {
         console.error("Error uploading file:", (error as Error).message);
      } finally {
         setUploading(false);
      }
   };

   return (
      <div className="max-w-4xl mx-auto space-y-8">

         <Card>
            <CardHeader>
               <CardTitle>File Upload</CardTitle>
               <CardDescription>
                  Choose files to upload and set their privacy settings
               </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}`}
               >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  {isDragActive ? (
                     <p className="text-lg">Drop the files here...</p>
                  ) : (
                     <p className="text-lg">
                        Drag n drop files here, or click to select files
                     </p>
                  )}
               </div>

               {acceptedFiles.length > 0 && (
                  <div className="space-y-4">
                     <h3 className="font-semibold">Selected Files:</h3>
                     <ul className="space-y-2">
                        {acceptedFiles.map((file) => (
                           <li
                              key={file.name}
                              className="flex items-center gap-2 text-sm"
                           >
                              <span>📄</span>
                              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                           </li>
                        ))}
                     </ul>
                  </div>
               )}

               <div className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="name" className="text-right">
                        File name
                     </Label>
                     <Input id="filename" name="filename" placeholder={"kaleel"} onChange={(e) => handleChange(e)} className="col-span-3" />
                  </div>

                  <div>
                     <label className="text-sm font-medium">Privacy Setting</label>
                     <Select
                        value={privacy}
                        onValueChange={(value: 'private' | 'shared' | 'public') =>
                           setPrivacy(value)
                        }
                     >
                        <SelectTrigger className="w-full">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="private">
                              <div className="flex items-center gap-2">
                                 <Lock className="h-4 w-4" />
                                 Private
                              </div>
                           </SelectItem>
                           <SelectItem value="shared">
                              <div className="flex items-center gap-2">
                                 <Users className="h-4 w-4" />
                                 Shared
                              </div>
                           </SelectItem>
                           <SelectItem value="public">
                              <div className="flex items-center gap-2">
                                 <Globe className="h-4 w-4" />
                                 Public
                              </div>
                           </SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  {uploading && (
                     <div className="space-y-2">
                        <Progress value={progress} />
                        <p className="text-sm text-muted-foreground text-center">
                           Uploading... {progress}%
                        </p>
                     </div>
                  )}

                  <Button
                     onClick={handleUpload}
                     disabled={acceptedFiles.length === 0 || uploading}
                     className="w-full"
                  >
                     {uploading ? 'Uploading...' : 'Upload Files'}
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}