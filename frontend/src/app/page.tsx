// import Image from "next/image";
"use client"
import ImageTrail from '@/components/imageTrail';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Lock, Share2 } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Aurora from '@/components/aurora';
export default function Home() {
   const key = ''
   return (
      <div className="min-h-screen bg-background flex flex-col">

         <Navbar />
         <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            speed={0.2}
         />
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
                  ]}
                  variant={1}
               />
               <section className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 py-12 lg:py-4">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="flex-1 max-w-2xl"
                  >
                     <h1 className="text-4xl md:text-6xl font-bold text-primary-dark">
                        Secure Your Digital Legacy
                     </h1>
                     <p className="mt-6 text-xl text-muted-foreground">
                        OnchainVault provides decentralized storage with unmatched security and
                        privacy. Store, share, and manage your digital assets with complete control.
                     </p>
                     <div className="mt-8 flex gap-4">
                        <Button size="lg" asChild>
                           <a href="/dashboard">
                              Get Started <ArrowRight className="ml-2 h-5 w-5" />
                           </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                           <a href="/explore">Explore Files</a>
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
         <Footer />
      </div>
   );
}
