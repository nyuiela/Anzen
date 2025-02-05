import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  HardDrive,
  Activity,
  Bot,
  Shield,
  Settings,
  BarChart2,
  AlertTriangle,
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats] = useState({
    users: 15234,
    storage: '45.8 TB',
    activeAgents: 12,
    alerts: 3,
  });

  const recentActivities = [
    {
      type: 'alert',
      message: 'Unusual storage activity detected',
      time: '5 minutes ago',
    },
    {
      type: 'agent',
      message: 'AI Agent optimized storage allocation',
      time: '15 minutes ago',
    },
    {
      type: 'user',
      message: 'New enterprise user registered',
      time: '1 hour ago',
    },
  ];

  const aiAgents = [
    {
      name: 'StorageOptimizer',
      status: 'active',
      tasks: 234,
      efficiency: 98,
    },
    {
      name: 'SecurityMonitor',
      status: 'active',
      tasks: 567,
      efficiency: 99,
    },
    {
      name: 'ContentAnalyzer',
      status: 'active',
      tasks: 123,
      efficiency: 95,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          System overview and management
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.storage}</div>
            <p className="text-xs text-muted-foreground">78% of capacity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active AI Agents</CardTitle>
            <Bot className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAgents}</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.alerts}</div>
            <p className="text-xs text-destructive">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Agents Overview */}
      <Card>
        <CardHeader>
          <CardTitle>AI Agents Overview</CardTitle>
          <CardDescription>Active agents and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {aiAgents.map((agent) => (
              <div
                key={agent.name}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{agent.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {agent.tasks} tasks completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{agent.efficiency}% Efficient</div>
                    <div className="text-xs text-muted-foreground">{agent.status}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>System events and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className={`rounded-full p-2 ${
                    activity.type === 'alert' ? 'bg-destructive/10 text-destructive' :
                    activity.type === 'agent' ? 'bg-primary/10 text-primary' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {activity.type === 'alert' && <AlertTriangle className="h-4 w-4" />}
                    {activity.type === 'agent' && <Bot className="h-4 w-4" />}
                    {activity.type === 'user' && <Users className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center gap-2">
                <Shield className="h-6 w-6" />
                Security Scan
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-2">
                <Activity className="h-6 w-6" />
                System Health
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-2">
                <Settings className="h-6 w-6" />
                Configure AI
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-2">
                <BarChart2 className="h-6 w-6" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
