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
  Wallet,
  Database,
  Link as LinkIcon,
  Activity,
  Layers,
  FileText,
  Code,
  CheckCircle,
} from 'lucide-react';

export default function BlockchainPage() {
  const transactions = [
    {
      hash: '0x1234...5678',
      type: 'File Upload',
      status: 'Confirmed',
      time: '2 minutes ago',
    },
    {
      hash: '0x5678...9abc',
      type: 'Access Grant',
      status: 'Pending',
      time: '5 minutes ago',
    },
    {
      hash: '0x9abc...def0',
      type: 'Smart Contract',
      status: 'Confirmed',
      time: '10 minutes ago',
    },
  ];

  return (
    <div className="space-y-12 pb-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Layers className="h-16 w-16 mx-auto text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            Blockchain Integration
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Decentralized storage and smart contracts for secure file management
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Database className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Decentralized Storage</CardTitle>
            <CardDescription>
              Files are stored across a distributed network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>IPFS integration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Content addressing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Redundant storage</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Code className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Smart Contracts</CardTitle>
            <CardDescription>
              Automated access control and file management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Access control</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Token gating</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Automated payments</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Activity className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Track all file-related blockchain activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Immutable records</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Activity tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Audit trails</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Latest blockchain activities and file operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.hash}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-mono text-sm">{tx.hash}</p>
                    <p className="text-sm text-muted-foreground">{tx.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{tx.status}</p>
                  <p className="text-sm text-muted-foreground">{tx.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Contract Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Contract Interaction</CardTitle>
          <CardDescription>
            Test our smart contract functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Grant Access</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Recipient Address</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      className="w-full mt-1 p-2 rounded-md bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">File CID</label>
                    <input
                      type="text"
                      placeholder="Qm..."
                      className="w-full mt-1 p-2 rounded-md bg-background"
                    />
                  </div>
                  <Button className="w-full">
                    Grant Access
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Contract Events</h3>
              <div className="p-4 bg-muted rounded-lg h-[200px] overflow-y-auto">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-primary">→</span> Access granted to 0x123...
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">←</span> New file uploaded
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">→</span> Permission updated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">10K+</CardTitle>
            <CardDescription>Files Stored</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">50K+</CardTitle>
            <CardDescription>Transactions</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">5K+</CardTitle>
            <CardDescription>Smart Contracts</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">1M+</CardTitle>
            <CardDescription>IPFS Objects</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* CTA */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Start Building on Blockchain</h2>
        <p className="text-muted-foreground">
          Integrate your application with our blockchain infrastructure
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
          <Button size="lg" variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Documentation
          </Button>
        </div>
      </section>
    </div>
  );
}
