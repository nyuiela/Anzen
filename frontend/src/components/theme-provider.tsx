// src/components/theme-provider.tsx
import React, { createContext, useContext, useState } from 'react';

// Create a Context for theme
const ThemeContext = createContext({
  theme: 'light',  // Default theme
  setTheme: (_theme: string) => {}, // Default setter function
});

interface ThemeProviderProps {
  defaultTheme: string;
  storageKey: string;
  children: React.ReactNode; // Correctly typing the children prop
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme, storageKey }) => {
  const [theme, setTheme] = useState(localStorage.getItem(storageKey) || defaultTheme);

  // Update theme and save to localStorage
  const updateTheme = (newTheme: string) => {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);
