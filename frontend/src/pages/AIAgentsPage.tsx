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
  Bot,
  Brain,
  Shield,
  Search,
  Zap,
  FileSearch,
  Settings,
  Activity,
} from 'lucide-react';

export default function AIAgentsPage() {
  const agents = [
    {
      name: 'Content Analyzer',
      description: 'Analyzes file content for insights and classification',
      status: 'Active',
      tasks: 1234,
      icon: FileSearch,
    },
    {
      name: 'Security Monitor',
      description: 'Monitors for security threats and anomalies',
      status: 'Active',
      tasks: 5678,
      icon: Shield,
    },
    {
      name: 'Storage Optimizer',
      description: 'Optimizes storage allocation and performance',
      status: 'Active',
      tasks: 910,
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold gradient-text">AI Agents</h1>
        <p className="text-muted-foreground mt-2">
          Intelligent agents working to optimize your storage
        </p>
      </motion.div>

      {/* Agent Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.name} className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <agent.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <CardDescription>{agent.status}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {agent.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm">{agent.tasks} tasks completed</span>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Agent Activity</CardTitle>
          <CardDescription>Latest actions performed by AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-b border-border pb-4 last:border-0"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Content analysis completed for new uploads
                  </p>
                  <p className="text-xs text-muted-foreground">
                    5 minutes ago • Content Analyzer
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
            <CardDescription>System resource usage and efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>CPU Usage</span>
                  <span>45%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Memory Usage</span>
                  <span>60%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Task Success Rate</span>
                  <span>98%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: '98%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agent Settings</CardTitle>
            <CardDescription>Configure AI behavior and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Brain className="h-6 w-6" />
                Learning Mode
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Settings className="h-6 w-6" />
                Preferences
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Shield className="h-6 w-6" />
                Permissions
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Activity className="h-6 w-6" />
                Monitoring
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
