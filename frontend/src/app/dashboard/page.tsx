"use client"
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Users, Eye } from 'lucide-react';
import FileGrid from '@/components/files/FileGrid';
import Navbar from '@/components/navbar';
import CircularGallery from '@/components/CircularGallery'
import { VaultDialog } from '@/components/vaultDialog';
import CustomButton from '@/components/customButton';
import { entry, factory, vault } from '@/backend/web3';
import { DropdownVault } from '@/components/cards/dropdownVault';
import { ConnectDialog } from '@/components/connectDialog';
import { useEffect, useState } from 'react';
import { VaultTable } from '@/components/cards/vaultTable';
import { VaultGroupDialog } from '@/components/vaultGroup';
import { GroupDialog } from '@/components/groupDialog';

export default function Dashboard() {
   // const { files } = useStore();
   const [profile, setProfile] = useState({
      vaults: []
   })

   // const privateFiles = files.filter((f) => f.privacy === 'private');
   // const sharedFiles = files.filter((f) => f.privacy === 'shared');
   // const publicFiles = files.filter((f) => f.privacy === 'public');
   const click = async () => {
      await factory.methods.createVault().call({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' })
   }

   useEffect(() => {
      async function getVaults() {
         const profile = await entry.methods.getProfile().call({ from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" })
         setProfile(profile);
         // profile.vaults.map((item) => items.push({
         //    image: "`https://picsum.photos/seed/1/800/600?grayscale`",
         //    text: item,
         // }));
      }
      getVaults()
   }, [])
   // files = profile.vaults;
   // const items = profile.vaults;
   console.log(profile)
   // {
   //    image: `https://picsum.photos/seed/1/800/600?grayscale`,
   //    text: "Bridge",
   // },
   // {
   //    image: `https://picsum.photos/seed/2/800/600?grayscale`,
   //    text: "Desk Setup",
   // }

   return (
      <div className="min-h-screen bg-background flex flex-col z-[10]">
         <Navbar />
         <main className="container mx-auto px-4 py-8 flex-1 z-[1]">
            <div className="space-y-8">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col md:flex-row gap-6"
               >
                  <Card className="flex-1">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Lock className="h-5 w-5" />
                           Private Files
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="text-3xl font-bold">{0}</div>
                     </CardContent>
                  </Card>
                  <Card className="flex-1">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Users className="h-5 w-5" />
                           Shared Files
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="text-3xl font-bold">{0}</div>
                     </CardContent>
                  </Card>
                  <Card className="flex-1">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Eye className="h-5 w-5" />
                           Public Files
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="text-3xl font-bold">{0}</div>
                     </CardContent>
                  </Card>
               </motion.div>

               <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold">Your Vaults</h2>
                  {/* <VaultDialog /> */}
                  {/* <DropdownVault /> */}
                  <GroupDialog />
                  <VaultDialog />
                  <VaultGroupDialog />
                  {/* <ConnectDialog /> */}
                  {/* <CustomButton label='Create Vault' click={click} /> */}
               </div>

               <Tabs defaultValue="all" className="w-full">
                  {/* <TabsList>
                     <TabsTrigger value="all">All Files</TabsTrigger>
                     <TabsTrigger value="private">Private</TabsTrigger>
                     <TabsTrigger value="shared">Shared</TabsTrigger>
                     <TabsTrigger value="public">Public</TabsTrigger>
                  </TabsList> */}
                  <TabsContent value="all">
                     <VaultTable address={profile.vaults} />
                  </TabsContent>
                  {/* <TabsContent value="private">
                     <FileGrid files={privateFiles} />
                  </TabsContent>
                  <TabsContent value="shared">
                     <FileGrid files={sharedFiles} />
                  </TabsContent>
                  <TabsContent value="public">
                     <FileGrid files={publicFiles} />
                  </TabsContent> */}
               </Tabs>
            </div>
            <div style={{ height: '600px', position: 'relative' }} className='w-full flex justify-center'>
               {/* <CircularGallery items={items} bend={3} textColor="#ffffff" borderRadius={0.05} /> */}
            </div>

         </main>
      </div>
   );
}