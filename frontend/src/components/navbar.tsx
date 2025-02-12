// import { a } from 'react-router-dom';
"use client"
import { Button } from '@/components/ui/button';
// import { ModeToggle } from '@/components/theme-toggle';
import {
   HardDriveIcon,
   MenuIcon,
   BarChart2,
   Bell,
   User,
   Bot,
   Shield,
   Wallet,
   Lock,
   Search,
} from 'lucide-react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   DropdownMenuGroup,
   DropdownMenuSeparator,
   DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
// import { useStore } from '@/lib/store';
import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   // NavigationMenu,
   NavigationMenuList,
   NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ConnectButton } from '@particle-network/connectkit';

export default function Navbar() {
   // const { user } = useStore();
   const { user } = { user: { address: "" } };

   const features = [
      {
         title: "AI Agents",
         href: "/ai-agents",
         description: "Intelligent agents for content analysis and optimization",
         icon: Bot,
      },
      {
         title: "Zero Knowledge",
         href: "/security/zero-knowledge",
         description: "Privacy-preserving computations and verification",
         icon: Lock,
      },
      {
         title: "Blockchain",
         href: "/blockchain",
         description: "Decentralized storage and smart contracts",
         icon: Wallet,
      },
      {
         title: "Security",
         href: "/security",
         description: "Advanced security features and monitoring",
         icon: Shield,
      },
   ];

   const resources = [
      {
         title: "Documentation",
         href: "/docs",
         description: "Detailed guides and API references",
      },
      {
         title: "Community",
         href: "/community",
         description: "Join our growing community",
      },
      {
         title: "Blog",
         href: "/blog",
         description: "Latest updates and articles",
      },
      {
         title: "Support",
         href: "/support",
         description: "Get help from our team",
      },
   ];

   return (
      <nav className="border-b bg-transparent backdrop-blur-sm sticky top-0 z-50 px-10 border-b-white/40">
         <div className="container flex h-16 items-center px-4 justify-between">
            <a href="/" className="flex items-center space-x-2">
               <HardDriveIcon className="h-6 w-6 text-primary" />
               <span className="font-bold gradient-text">OnchainVault</span>
            </a>
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
                  {/* <NavigationMenuList>
                     <NavigationMenuItem>
                        <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                        <NavigationMenuContent>
                           <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                              {features.map((feature) => (
                                 <li key={feature.title}>
                                    <NavigationMenu asChild>
                                       <a
                                          href={feature.href}
                                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                       >
                                          <div className="flex items-center gap-2">
                                             <feature.icon className="h-4 w-4 text-primary" />
                                             <div className="text-sm font-medium leading-none">
                                                {feature.title}
                                             </div>
                                          </div>
                                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                             {feature.description}
                                          </p>
                                       </a>
                                    </NavigationMenu>
                                 </li>
                              ))}
                           </ul>
                        </NavigationMenuContent>
                     </NavigationMenuItem>
                     <NavigationMenuItem>
                        <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                        <NavigationMenuContent>
                           <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                              {resources.map((resource) => (
                                 <li key={resource.title}>
                                    <NavigationMenu asChild>
                                       <a
                                          href={resource.href}
                                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                       >
                                          <div className="text-sm font-medium leading-none">
                                             {resource.title}
                                          </div>
                                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                             {resource.description}
                                          </p>
                                       </a>
                                    </NavigationMenu>
                                 </li>
                              ))}
                           </ul>
                        </NavigationMenuContent>
                     </NavigationMenuItem>
                     <NavigationMenuItem>
                        <a href="/pricing">
                           <NavigationMenu
                              className={cn(
                                 "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                              )}
                           >
                              Pricing
                           </NavigationMenu>
                        </a>
                     </NavigationMenuItem>
                  </NavigationMenuList> */}
               </NavigationMenu>

               {/* {user ? (
                  <>
                     <a href="/dashboard">
                        <Button variant="ghost">Dashboard</Button>
                     </a>
                     <a href="/analytics">
                        <Button variant="ghost">
                           <BarChart2 className="h-4 w-4 mr-2" />
                           Analytics
                        </Button>
                     </a>
                     <a href="/notifications">
                        <Button variant="ghost" className="relative">
                           <Bell className="h-4 w-4" />
                           <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
                              3
                           </span>
                        </Button>
                     </a>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" size="icon" className="rounded-full">
                              <User className="h-5 w-5" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                           <DropdownMenuLabel>My Account</DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuGroup>
                              <DropdownMenuItem asChild>
                                 <a href={`/profile/${user.address}`}>Profile</a>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                 <a href="/settings">Settings</a>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                 <a href="/billing">Billing</a>
                              </DropdownMenuItem>
                           </DropdownMenuGroup>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem>
                              Log out
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </>
               ) : (
                  <Button>Connect Wallet</Button>
               )} */}
               {/* <Button>Connect Wallet</Button> */}
               <ConnectButton />
               {/* <ModeToggle /> */}
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
                        <a href="/explore">Explore</a>
                     </DropdownMenuItem>
                     {user ? (
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
                        <DropdownMenuItem>Connect Wallet</DropdownMenuItem>
                     )}
                  </DropdownMenuContent>
               </DropdownMenu>
               {/* <ModeToggle /> */}
            </div>
         </div>
      </nav>
   );
}
