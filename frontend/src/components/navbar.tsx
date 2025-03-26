// import { a } from 'react-router-dom';
"use client"
import { Button } from '@/components/ui/button';
// import { ModeToggle } from '@/components/theme-toggle';
import {
   HardDriveIcon,
   MenuIcon,
   Link,
} from 'lucide-react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { useStore } from '@/lib/store';
import {
   NavigationMenu,
} from '@/components/ui/navigation-menu';
import { useEffect } from 'react';
// import { GetAddressResponse } from '@gemwallet/api';
import { ConnectButton } from '@particle-network/connectkit';
import { useSelector } from 'react-redux';

export default function Navbar() {
   // const { user } = useStore();
   const user = useSelector((state) => state.account)

   useEffect(() => {
      // async function getAddr() {
      //    if (await isInstalled()) {
      //       const addr = await getAddress()
      //       setAddress(addr)
      //    }
      // }
      // getAddr()
   }, [])

   // const features = [
   //    {
   //       title: "AI Agents",
   //       href: "/ai-agents",
   //       description: "Intelligent agents for content analysis and optimization",
   //       icon: Bot,
   //    },
   //    {
   //       title: "Zero Knowledge",
   //       href: "/security/zero-knowledge",
   //       description: "Privacy-preserving computations and verification",
   //       icon: Lock,
   //    },
   //    {
   //       title: "Blockchain",
   //       href: "/blockchain",
   //       description: "Decentralized storage and smart contracts",
   //       icon: Wallet,
   //    },
   //    {
   //       title: "Security",
   //       href: "/security",
   //       description: "Advanced security features and monitoring",
   //       icon: Shield,
   //    },
   // ];

   // const resources = [
   //    {
   //       title: "Documentation",
   //       href: "/docs",
   //       description: "Detailed guides and API references",
   //    },
   //    {
   //       title: "Community",
   //       href: "/community",
   //       description: "Join our growing community",
   //    },
   //    {
   //       title: "Blog",
   //       href: "/blog",
   //       description: "Latest updates and articles",
   //    },
   //    {
   //       title: "Support",
   //       href: "/support",
   //       description: "Get help from our team",
   //    },
   // ];

   return (
      <nav className="border-b bg-transparent backdrop-blur-sm sticky top-0 z-50 px-10 border-b-white/40">
         <div className="container flex h-16 items-center px-4 justify-between">
            <Link href="/" className="flex items-center space-x-2">
               <HardDriveIcon className="h-6 w-6 text-primary" />
               <span className="font-bold gradient-text">OnchainVault</span>
            </Link>
            {/* 
            <div className="flex-1 px-4">
               <div className="relative max-w-md">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                     placeholder="Search files, users, or content..."
                     className="pl-8"
                  />
               </div>
            </div> */}

            <div className="hidden md:flex md:items-center md:space-x-4">
               <NavigationMenu>
               </NavigationMenu>
               {/* <Button onClick={getAddr}> Connect Wallet</Button> */}
               <ConnectButton />
            </div>

            <div className="md:hidden flex items-center space-x-2">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <MenuIcon className="h-5 w-5" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                     <DropdownMenuItem asChild>
                        <a href="/marketplace">Explore</a>
                     </DropdownMenuItem>
                     {user.exists ? (
                        <>
                           <DropdownMenuItem asChild>
                              <a href="/dashboard">Dashboard</a>
                           </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                              <a href="/analytics">Analytics</a>
                           </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                              <a href="/notifications">Notifications</a>
                           </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                              <a href="/upload">Upload</a>
                           </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                              <a href={`/profile/${user.address}`}>Profile</a>
                           </DropdownMenuItem>
                        </>
                     ) : (
                        // <DropdownMenuItem onClick={getAddr}>Connect Wallet</DropdownMenuItem>
                        <ConnectButton />
                     )}
                  </DropdownMenuContent>
               </DropdownMenu>
               {/* <ModeToggle /> */}
            </div>
         </div>
      </nav>
   );
}
