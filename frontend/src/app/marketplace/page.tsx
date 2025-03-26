'use client'
import React, { useState } from 'react';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import { MarketplaceCard } from '@/components/MarketplaceCard';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'History', 'Architecture', 'Memories', 'Travel', 'Education'];

const SAMPLE_DATA = [
   {
      id: 1,
      title: 'Historical World War II Documentation',
      description: 'Authentic footage and documents from WWII, verified by historians.',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1587483166702-bf9aa66bd791?auto=format&fit=crop&q=80',
      category: 'History'
   },
   {
      id: 2,
      title: 'Ancient Rome Architecture Collection',
      description: 'Detailed 3D scans and documentation of Roman architecture.',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80',
      price: 199.99,
      category: 'Architecture'
   },
   {
      id: 3,
      title: 'Tokyo Travel Guide 2024',
      description: 'Comprehensive travel data and hidden gems of Tokyo.',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80',
      price: 49.99,
      category: 'Travel'
   }
];

export default function Marketplace() {
   const [selectedCategory, setSelectedCategory] = useState('All');
   const [searchQuery, setSearchQuery] = useState('');
   const [loading, setLoading] = useState<number | null>(null);

   const filteredData = SAMPLE_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
   });

   const handlePurchase = async (id: number) => {
      setLoading(id);
      try {
         // Simulate API call
         await new Promise(resolve => setTimeout(resolve, 2000));
         toast.success('Purchase successful! Check your Auzen vault.');
      } catch {
         toast.error('Purchase failed. Please try again.');
      } finally {
         setLoading(null);
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-b from-auzen-black to-auzen-black-light p-6">
         <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
               <h1 className="text-3xl font-bold text-auzen-gold">
                  <ShoppingBag className="inline-block mr-2 mb-1" />
                  Auzen Marketplace
               </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
               <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                     type="text"
                     placeholder="Search marketplace..."
                     className="w-full pl-10 pr-4 py-2 bg-auzen-black-light text-white rounded-lg focus:ring-2 focus:ring-auzen-gold outline-none"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>

               <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <Filter className="text-auzen-gold" />
                  {CATEGORIES.map(category => (
                     <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200
                  ${selectedCategory === category
                              ? 'bg-auzen-gold text-auzen-black'
                              : 'bg-auzen-black-light text-auzen-gold hover:bg-auzen-black-light/80'
                           }`}
                     >
                        {category}
                     </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredData.map(item => (
                  <MarketplaceCard
                     key={item.id}
                     {...item}
                     loading={loading === item.id}
                     onPurchase={() => handlePurchase(item.id)}
                  />
               ))}
            </div>
         </div>
      </div>
   );
}