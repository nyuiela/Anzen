import React from 'react';
import { X, Shield, Clock, Tag, User, Calendar, Globe } from 'lucide-react';
import { LoadingButton } from './LoadingButton';

interface DetailModalProps {
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    author?: string;
    date?: string;
    location?: string;
    views?: number;
  };
  onClose: () => void;
  onPurchase: () => void;
  loading?: boolean;
}

export function DetailModal({ item, onClose, onPurchase, loading }: DetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-auzen-black rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-auzen-gold hover:text-auzen-gold-light z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-auzen-gold px-3 py-1 rounded-full text-auzen-black font-semibold">
              {item.category}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">{item.title}</h2>
          <p className="text-gray-400 mb-6">{item.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {item.author && (
              <div className="flex items-center text-auzen-gold">
                <User className="w-4 h-4 mr-2" />
                <span className="text-sm">{item.author}</span>
              </div>
            )}
            {item.date && (
              <div className="flex items-center text-auzen-gold">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{item.date}</span>
              </div>
            )}
            {item.location && (
              <div className="flex items-center text-auzen-gold">
                <Globe className="w-4 h-4 mr-2" />
                <span className="text-sm">{item.location}</span>
              </div>
            )}
            {item.views && (
              <div className="flex items-center text-auzen-gold">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm">{item.views} views</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between border-t border-auzen-black-light pt-6">
            <div className="flex items-center text-auzen-gold">
              <Tag className="w-6 h-6 mr-2" />
              <span className="text-2xl font-bold">${item.price}</span>
            </div>
            <LoadingButton
              onClick={onPurchase}
              loading={loading}
              className="w-40"
            >
              Purchase Now
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}