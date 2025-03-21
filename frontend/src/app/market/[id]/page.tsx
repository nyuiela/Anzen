'use client'
import { marketplace } from '@/backend/web3'
import CustomButton from '@/components/customButton'
import Navbar from '@/components/navbar'
import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'

const Page = ({ params }: {
   params: Promise<{ id: number }>
}) => {
   console.log(params)
   const [info, setInfo] = useState({
      name: "History",
      reward: 300,
      totalDeposits: 4000,
   })
   interface File {
      name: string,
      id: string,
      bond: number
   }
   useEffect(() => {
      async function getInfo() {
         const id = (await params).id;
         const infoR = await marketplace.methods.getMarketInfo(id).call({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' });
         setInfo(infoR);
      }
      getInfo()
   }, [params])
   console.log(info)
   return (
      // <div>page</div>
      <div className="min-h-fit bg-background flex flex-col">

         <Navbar />

         <main className="container mx-auto px-4 py-8 flex-1 z-[1]">
            <div className="flex justify-between items-center">
               <h2 className="text-3xl font-bold">{info.name} Market</h2>
               {/* <VaultDialog /> */}
               <CustomButton label='Add to Market' />
            </div>
            <div className='w-full h-full customgrid mt-10'>
               <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                     <span className="text-4xl font-semibold">
                        dd
                     </span>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                     <span className="text-4xl font-semibold">
                        dd
                     </span>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                     <span className="text-4xl font-semibold">
                        dd
                     </span>
                  </CardContent>
               </Card>


            </div>
         </main>
      </div>

   )
}

export default Page