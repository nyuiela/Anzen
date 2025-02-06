import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Shield,
  Lock,
  Key,
  FileKey,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="space-y-12 pb-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Shield className="h-16 w-16 mx-auto text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            Enterprise-Grade Security
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your data is protected with state-of-the-art security features and
            zero-knowledge proofs
          </p>
        </motion.div>
      </section>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Lock className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Zero-Knowledge Proofs</CardTitle>
            <CardDescription>
              Verify without revealing sensitive information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Private transactions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Secure authentication</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Data verification</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileKey className="h-8 w-8 text-primary mb-2" />
            <CardTitle>End-to-End Encryption</CardTitle>
            <CardDescription>
              Military-grade encryption for all your files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>AES-256 encryption</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Secure key management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Client-side encryption</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Key className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Access Control</CardTitle>
            <CardDescription>
              Granular control over who can access your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Role-based access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Time-based permissions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Audit logging</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Zero Knowledge Proof Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Zero Knowledge Proof Demo</CardTitle>
          <CardDescription>
            See how you can prove ownership without revealing sensitive data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Prover</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span>Secret Value:</span>
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-4 w-4" />
                    <span className="font-mono">********</span>
                  </div>
                </div>
                <Button className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate Proof
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Verifier</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span>Verification Status:</span>
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle className="h-4 w-4" />
                    <span>Verified</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Verify Proof
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">100%</CardTitle>
            <CardDescription>End-to-End Encrypted</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">24/7</CardTitle>
            <CardDescription>Security Monitoring</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">0</CardTitle>
            <CardDescription>Data Breaches</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">SOC2</CardTitle>
            <CardDescription>Compliant</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* CTA */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to Secure Your Data?</h2>
        <p className="text-muted-foreground">
          Start protecting your digital assets with OnchainVault
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </section>
    </div>
  );
}
