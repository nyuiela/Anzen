import { create } from 'zustand';

interface User {
   address: string;
   profile?: {
      name: string;
      avatar: string;
      bio: string;
   };
}

export interface File {
   id: string;
   name: string;
   type: string;
   size: number;
   privacy: 'private' | 'shared' | 'public';
   uploadedAt: Date;
   owner: string;
   cid: string;
   thumbnail?: string;
   likes: number;
   comments: number;
}

interface AppState {
   user: User | null;
   files: File[];
   darkMode: boolean;
   setUser: (user: User | null) => void;
   setFiles: (files: File[]) => void;
   toggleDarkMode: () => void;
}

export const useStore = create<AppState>((set) => ({
   user: null,
   files: [],
   darkMode: false,
   setUser: (user) => set({ user }),
   setFiles: (files) => set({ files }),
   toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));