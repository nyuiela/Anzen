import { useState } from 'react';
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
  Book,
  Code,
  FileText,
  Github,
  Search,
  Terminal,
  Zap,
  ChevronRight,
} from 'lucide-react';

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      title: "Getting Started",
      description: "Learn the basics of OnchainVault",
      icon: Zap,
      link: "#",
    },
    {
      title: "API Reference",
      description: "Complete API documentation",
      icon: Code,
      link: "#",
    },
    {
      title: "SDK Guide",
      description: "Build with our SDK",
      icon: Terminal,
      link: "#",
    },
    {
      title: "Smart Contracts",
      description: "Contract documentation",
      icon: FileText,
      link: "#",
    },
  ];

  const examples = [
    {
      title: "File Upload",
      description: "Learn how to upload and encrypt files",
      language: "typescript",
      code: `const vault = new OnchainVault();
await vault.upload(file, {
  encryption: 'AES-256',
  privacy: 'private'
});`,
    },
    {
      title: "Access Control",
      description: "Manage file permissions",
      language: "typescript",
      code: `await vault.setAccess(fileId, {
  users: ['0x123...'],
  condition: 'tokenGated',
  tokenAddress: '0x456...'
});`,
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
          <Book className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build with OnchainVault
          </p>
        </motion.div>
      </section>

      {/* Search */}
      <section className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary"
          />
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {guides.map((guide) => (
          <Card key={guide.title} className="hover:border-primary transition-colors">
            <CardHeader>
              <guide.icon className="h-6 w-6 text-primary mb-2" />
              <CardTitle>{guide.title}</CardTitle>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href={guide.link}>
                  View Guide <ChevronRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Code Examples */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Code Examples</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {examples.map((example) => (
            <Card key={example.title} className="gold-border">
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{example.code}</code>
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" /> Github
            </CardTitle>
            <CardDescription>
              View source code, contribute, and track issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Repository
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" /> CLI Tool
            </CardTitle>
            <CardDescription>
              Command-line interface documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View CLI Docs
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" /> Tutorials
            </CardTitle>
            <CardDescription>
              Step-by-step guides and tutorials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Tutorials
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
