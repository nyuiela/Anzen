import React from 'react';
import { DollarSign } from 'lucide-react';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

export function PriceRangeFilter({ minPrice, maxPrice, onMinChange, onMaxChange }: PriceRangeFilterProps) {
  return (
    <div className="flex items-center gap-4 bg-auzen-black-light p-4 rounded-lg">
      <DollarSign className="text-auzen-gold" />
      <div className="flex-1">
        <input
          type="range"
          min="0"
          max="1000"
          value={minPrice}
          onChange={(e) => onMinChange(Number(e.target.value))}
          className="w-full h-2 bg-auzen-gold rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-auzen-gold">${minPrice}</span>
      </div>
      <span className="text-auzen-gold">-</span>
      <div className="flex-1">
        <input
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={(e) => onMaxChange(Number(e.target.value))}
          className="w-full h-2 bg-auzen-gold rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-auzen-gold">${maxPrice}</span>
      </div>
    </div>
  );
}