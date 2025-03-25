import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export function LoadingButton({ loading, children, className, ...props }: LoadingButtonProps) {
  return (
    <button
      className={`relative px-4 py-2 font-semibold rounded-lg transition-all duration-200 
        ${loading 
          ? 'bg-auzen-black-light text-auzen-gold-light cursor-not-allowed' 
          : 'bg-auzen-gold hover:bg-auzen-gold-light text-auzen-black hover:text-auzen-black-light'
        } ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && (
        <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin" />
      )}
      <span className={loading ? 'pl-7' : ''}>{children}</span>
    </button>
  );
}