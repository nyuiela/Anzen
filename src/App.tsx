import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
//import { ThemeProvider } from "../components/theme-provider";

import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import UploadPage from '@/pages/UploadPage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import FileDetailsPage from '@/pages/FileDetailsPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import NotificationsPage from '@/pages/NotificationsPage';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="onchainvault-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/profile/:address" element={<ProfilePage />} />
              <Route path="/file/:id" element={<FileDetailsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;