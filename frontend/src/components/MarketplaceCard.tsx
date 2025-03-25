import React from 'react';
import { Shield, Clock, Tag } from 'lucide-react';
import { LoadingButton } from '@/components/LoadingButton';

interface MarketplaceCardProps {
   title: string;
   description: string;
   price: number;
   image: string;
   category: string;
   onPurchase: () => void;
   loading?: boolean;
}

export function MarketplaceCard({
   title,
   description,
   price,
   image,
   category,
   onPurchase,
   loading
}: MarketplaceCardProps) {
   return (
      <div className="bg-auzen-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
         <div className="relative h-48 overflow-hidden">
            <img
               src={image}
               alt={title}
               className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 bg-auzen-gold px-3 py-1 rounded-full">
               <span className="text-auzen-black font-semibold">{category}</span>
            </div>
         </div>

         <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 mb-4">{description}</p>

            <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center text-auzen-gold">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="text-sm">Verified</span>
               </div>
               <div className="flex items-center text-auzen-gold">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">Instant Access</span>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center text-auzen-gold">
                  <Tag className="w-5 h-5 mr-2" />
                  <span className="text-xl font-bold">${price}</span>
               </div>
               <LoadingButton
                  onClick={onPurchase}
                  loading={loading}
                  className="w-32"
               >
                  Purchase
               </LoadingButton>
            </div>
         </div>
      </div>
   );
}