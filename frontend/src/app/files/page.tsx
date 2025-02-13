import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import React from 'react'
import RollingGallery from '@/components/rollingGallery'

const page = () => {
   return (
      <div className="min-h-screen bg-background flex flex-col">
         <main className="container mx-auto px-4 py-8 flex-1 z-[10] ">
            <div className="flex justify-between items-center">
               <h2 className="text-3xl font-bold">Files</h2>
               <Button asChild>
                  <a href="/upload">
                     <Upload className="mr-2 h-5 w-5" /> Upload Files
                  </a>
               </Button>
            </div>
            <div className='flex flex-col justify-center items-center'>

               <RollingGallery autoplay={true} pauseOnHover={true} />
            </div>
         </main>
      </div>
   )
}

export default page