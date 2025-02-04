import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Lock, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <section className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary-dark">
            Secure Your Digital Legacy
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            OnchainVault provides decentralized storage with unmatched security and
            privacy. Store, share, and manage your digital assets with complete control.
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/explore">Explore Files</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 grid grid-cols-2 gap-4 max-w-lg"
        >
          <div className="p-6 bg-background-darker rounded-lg">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Storage</h3>
            <p className="text-muted-foreground">
              Military-grade encryption for your files
            </p>
          </div>
          <div className="p-6 bg-background-darker rounded-lg">
            <Lock className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Privacy Control</h3>
            <p className="text-muted-foreground">
              You decide who can access your data
            </p>
          </div>
          <div className="p-6 bg-background-darker rounded-lg col-span-2">
            <Share2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Easy Sharing</h3>
            <p className="text-muted-foreground">
              Share files securely with programmable access controls
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}