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
  Bell,
  Users,
  FileIcon,
  Heart,
  MessageSquare,
  Share2,
  Settings,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const notifications = [
  {
    id: 1,
    type: 'follow',
    user: 'Alice.eth',
    time: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    icon: Users,
  },
  {
    id: 2,
    type: 'like',
    user: 'Bob.eth',
    fileName: 'project-proposal.pdf',
    time: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    icon: Heart,
  },
  {
    id: 3,
    type: 'comment',
    user: 'Carol.eth',
    fileName: 'vacation-photos.zip',
    time: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    icon: MessageSquare,
  },
  {
    id: 4,
    type: 'share',
    user: 'Dave.eth',
    fileName: 'research-paper.pdf',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    icon: Share2,
  },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with your file activity and interactions
          </p>
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                You have {notifications.filter((n) => !n.read).length} unread
                notifications
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                  notification.read ? 'bg-background' : 'bg-muted'
                }`}
              >
                <div
                  className={`rounded-full p-2 ${
                    notification.read
                      ? 'bg-background'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <notification.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{notification.user}</span>{' '}
                    {notification.type === 'follow' && 'started following you'}
                    {notification.type === 'like' &&
                      `liked your file "${notification.fileName}"`}
                    {notification.type === 'comment' &&
                      `commented on "${notification.fileName}"`}
                    {notification.type === 'share' &&
                      `shared "${notification.fileName}" with you`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(notification.time, { addSuffix: true })}
                  </p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Customize how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Email Notifications</div>
              <div className="text-sm text-muted-foreground">
                Receive notifications via email
              </div>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Push Notifications</div>
              <div className="text-sm text-muted-foreground">
                Receive notifications in your browser
              </div>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Activity Digest</div>
              <div className="text-sm text-muted-foreground">
                Get a daily summary of your activity
              </div>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}