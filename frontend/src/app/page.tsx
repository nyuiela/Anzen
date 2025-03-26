"use client"
import ImageTrail from '@/components/ImageTrail';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Share2 } from 'lucide-react';
import Navbar from '@/components/navbar';
import Aurora from '@/components/aurora';
import { useEffect, useState } from 'react';
import { ConnectDialog } from '@/components/connectDialog';
import Link from 'next/link';
import { entry } from '@/backend/web3';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount } from '@/context/redux/accountSlice';

export default function Home() {
   const key = ''
   const [profile, setProfile] = useState({
      owner: "",
      exists: false
   })
   const user = useSelector((state) => state.account)
   console.log("User : ", user)

   // const account = useAccount()
   const dispatch = useDispatch()

   useEffect(() => {
      async function getProfile() {
         // console.log("entry profile ", account.address)
         const profile = await entry.methods.getProfile().call({ from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" })
         const newProfile = {
            exists: Boolean(profile.exists),
            tokenId: Number(profile.tokenId),
            privacy: Number(profile.privacy),
            username: profile.username,
            vaults: profile.vaults,
            owner: profile.owner
         }
         if (profile.exists) {
            dispatch(setAccount(newProfile))
         }
         setProfile(profile)
      }
      getProfile()
   }, [dispatch])
   return (
      <div className="min-h-screen bg-background flex flex-col">
         <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            speed={0.2}
         />

         <Navbar />

         <main className="container mx-auto px-4 py-8 flex-1 z-[1]">

            {/* <div style={{ height: '500px', position: 'relative', overflow: 'hidden' }}> */}

            <div className="min-h-[calc(100vh-4rem)] flex flex-col">
               <ImageTrail
                  key={key}
                  items={[
                     'https://picsum.photos/id/287/300/300',
                     'https://picsum.photos/id/1001/300/300',
                     'https://picsum.photos/id/1025/300/300',
                     'https://picsum.photos/id/1026/300/300',
                     'https://picsum.photos/id/1027/300/300',
                     'https://picsum.photos/id/1028/300/300',
                     'https://picsum.photos/id/1029/300/300',
                     'https://picsum.photos/id/1030/300/300',
                     // ...
                  ] as string[]}
                  variant={1}
               />
               <section className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 py-12 lg:py-4">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="flex-1 max-w-2xl"
                  >
                     <h1 className="text-5xl md:text-6xl font-bold text-primary-dark font-['panchang'] ">
                        Secure Your Digital Legacy
                     </h1>
                     <p className="mt-6 text-xl text-muted-foreground">
                        OnchainVault provides decentralized storage with unmatched security and
                        privacy. Store, share, and manage your digital assets with complete control.
                     </p>
                     <div className="mt-8 flex gap-4">
                        {!profile.exists && <ConnectDialog />}
                        <Button size="lg" variant="outline" asChild>
                           <Link href="/dashboard">Explore Files</Link>
                        </Button>
                     </div>
                  </motion.div>
                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="flex-1 grid grid-cols-2 gap-4"
                  >
                     <div className="p-6 bg-background-darker rounded-lg">
                        <Shield className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Secure Storage</h3>
                        <p className="text-muted-foreground">
                           Military-grade encryption for your files
                        </p>
                     </div>
                     <div className="p-6 bg-background-darker rounded-lg">
                        <Lock className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Privacy Control</h3>
                        <p className="text-muted-foreground">
                           You decide who can access your data
                        </p>
                     </div>
                     <div className="p-6 bg-background-darker rounded-lg col-span-2">
                        <Share2 className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Easy Sharing</h3>
                        <p className="text-muted-foreground">
                           Share files securely with programmable access controls
                        </p>
                     </div>
                  </motion.div>
               </section>
            </div>
            {/* </div> */}
         </main>
         {/* <Footer /> */}
      </div>
   );
}
