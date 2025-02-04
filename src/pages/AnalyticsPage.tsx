import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  HardDrive,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Eye,
} from 'lucide-react';

export default function AnalyticsPage() {
  const { files } = useStore();

  const storageData = [
    { month: 'Jan', usage: 45 },
    { month: 'Feb', usage: 52 },
    { month: 'Mar', usage: 61 },
    { month: 'Apr', usage: 58 },
    { month: 'May', usage: 71 },
    { month: 'Jun', usage: 85 },
  ];

  const stats = [
    {
      title: 'Total Storage',
      value: '2.4 GB',
      change: '+12.5%',
      increasing: true,
      icon: HardDrive,
    },
    {
      title: 'Total Files',
      value: files.length.toString(),
      change: '+8.2%',
      increasing: true,
      icon: Activity,
    },
    {
      title: 'File Views',
      value: '3.2K',
      change: '-3.1%',
      increasing: false,
      icon: Eye,
    },
    {
      title: 'Unique Visitors',
      value: '1.2K',
      change: '+14.2%',
      increasing: true,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track your storage usage and file analytics
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span
                  className={
                    stat.increasing ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {stat.increasing ? (
                    <ArrowUpRight className="inline h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="inline h-3 w-3" />
                  )}
                  {stat.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>
              Monthly storage consumption trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={storageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="usage"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>File Distribution</CardTitle>
            <CardDescription>
              Breakdown of file types and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-medium mb-3">By File Type</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                    <span className="ml-4 text-sm">Images (45%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                    <span className="ml-4 text-sm">Documents (30%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                    <span className="ml-4 text-sm">Videos (25%)</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">By Privacy Setting</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                    <span className="ml-4 text-sm">Private (60%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                    <span className="ml-4 text-sm">Shared (25%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: '15%' }}
                      ></div>
                    </div>
                    <span className="ml-4 text-sm">Public (15%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}