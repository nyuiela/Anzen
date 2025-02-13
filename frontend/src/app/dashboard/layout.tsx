import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className='bg-background text-white z-[20]'>
         {children}
      </div>
   )
}

export default layout