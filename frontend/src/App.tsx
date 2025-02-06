import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
//import { ThemeProvider } from "../components/theme-provider";


import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import UploadPage from '@/pages/UploadPage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import FileDetailsPage from '@/pages/FileDetailsPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import NotificationsPage from '@/pages/NotificationsPage';
import CommunityPage from '@/pages/CommunityPage';
import DocsPage from '@/pages/DocsPage';
import LoginPage from '@/pages/LoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import AIAgentsPage from '@/pages/AIAgentsPage';
import PricingPage from '@/pages/PricingPage';
import ContactPage from '@/pages/ContactPage';
import SecurityPage from '@/pages/SecurityPage';
import BlockchainPage from '@/pages/BlockchainPage';
import SettingsPage from '@/pages/SettingsPage';
import BillingPage from '@/pages/BillingPage';
import BlogPage from '@/pages/BlogPage';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="onchainvault-theme">
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/profile/:address" element={<ProfilePage />} />
              <Route path="/file/:id" element={<FileDetailsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/ai-agents" element={<AIAgentsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/blockchain" element={<BlockchainPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
