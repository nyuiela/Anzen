// import { a } from 'react-router-dom';
import {
   Github,
   Twitter,
   MessageCircle,
   Heart,
   HardDrive,
} from 'lucide-react';

export default function Footer() {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="border-t border-border mt-20">
         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
               {/* Brand */}
               <div className="space-y-4">
                  <a href="/" className="flex items-center space-x-2">
                     <HardDrive className="h-6 w-6 text-primary" />
                     <span className="font-bold gradient-text">OnchainVault</span>
                  </a>
                  <p className="text-sm text-muted-foreground">
                     Secure, decentralized storage for your digital assets
                  </p>
                  <div className="flex space-x-4">
                     <a href="#" className="text-muted-foreground hover:text-primary">
                        <Twitter className="h-5 w-5" />
                     </a>
                     <a href="#" className="text-muted-foreground hover:text-primary">
                        <Github className="h-5 w-5" />
                     </a>
                     <a href="#" className="text-muted-foreground hover:text-primary">
                        <MessageCircle className="h-5 w-5" />
                     </a>
                  </div>
               </div>

               {/* Product */}
               <div>
                  <h3 className="font-semibold mb-4">Product</h3>
                  <ul className="space-y-2">
                     <li>
                        <a href="/features" className="text-muted-foreground hover:text-primary">
                           Features
                        </a>
                     </li>
                     <li>
                        <a href="/pricing" className="text-muted-foreground hover:text-primary">
                           Pricing
                        </a>
                     </li>
                     <li>
                        <a href="/docs" className="text-muted-foreground hover:text-primary">
                           Documentation
                        </a>
                     </li>
                     <li>
                        <a href="/security" className="text-muted-foreground hover:text-primary">
                           Security
                        </a>
                     </li>
                  </ul>
               </div>

               {/* Company */}
               <div>
                  <h3 className="font-semibold mb-4">Company</h3>
                  <ul className="space-y-2">
                     <li>
                        <a href="/about" className="text-muted-foreground hover:text-primary">
                           About
                        </a>
                     </li>
                     <li>
                        <a href="/blog" className="text-muted-foreground hover:text-primary">
                           Blog
                        </a>
                     </li>
                     <li>
                        <a href="/careers" className="text-muted-foreground hover:text-primary">
                           Careers
                        </a>
                     </li>
                     <li>
                        <a href="/contact" className="text-muted-foreground hover:text-primary">
                           Contact
                        </a>
                     </li>
                  </ul>
               </div>

               {/* Resources */}
               <div>
                  <h3 className="font-semibold mb-4">Resources</h3>
                  <ul className="space-y-2">
                     <li>
                        <a href="/community" className="text-muted-foreground hover:text-primary">
                           Community
                        </a>
                     </li>
                     <li>
                        <a href="/developers" className="text-muted-foreground hover:text-primary">
                           Developers
                        </a>
                     </li>
                     <li>
                        <a href="/partners" className="text-muted-foreground hover:text-primary">
                           Partners
                        </a>
                     </li>
                     <li>
                        <a href="/changelog" className="text-muted-foreground hover:text-primary">
                           Changelog
                        </a>
                     </li>
                  </ul>
               </div>
            </div>

            {/* Bottom */}
            <div className="pt-8 border-t border-border">
               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                     © {currentYear} OnchainVault. All rights reserved.
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                     <a href="/privacy" className="hover:text-primary">
                        Privacy Policy
                     </a>
                     <a href="/terms" className="hover:text-primary">
                        Terms of Service
                     </a>
                     <a href="/cookies" className="hover:text-primary">
                        Cookie Policy
                     </a>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                     Made with <Heart className="h-4 w-4 text-primary mx-1" /> by OnchainVault Team
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
