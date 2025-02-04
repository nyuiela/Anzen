import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useStore } from '@/lib/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Settings,
  Users,
  FileIcon,
  Edit,
  Share2,
  Mail,
  Globe,
} from 'lucide-react';
import FileGrid from '@/components/files/FileGrid';

export default function ProfilePage() {
  const { address } = useParams();
  const { user, files } = useStore();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('files');

  const isOwnProfile = user?.address === address;
  const userFiles = files.filter((f) => f.owner === address);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="relative h-48 rounded-xl bg-gradient-to-r from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="-mt-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-8"
          >
            <div className="flex-shrink-0">
              <div className="h-32 w-32 rounded-full border-4 border-background bg-primary-lighter overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/personas/svg?seed=${address}`}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    {user?.profile?.name || 'Anonymous User'}
                  </h1>
                  <p className="text-sm text-muted-foreground break-all">
                    {address}
                  </p>
                </div>
                <div className="sm:ml-auto flex gap-2">
                  {isOwnProfile ? (
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" /> Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant={isFollowing ? 'outline' : 'default'}
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" /> Message
                      </Button>
                      <Button variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>1.2K</strong>{' '}
                    <span className="text-muted-foreground">Followers</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>{userFiles.length}</strong>{' '}
                    <span className="text-muted-foreground">Files</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>
                      {userFiles.filter((f) => f.privacy === 'public').length}
                    </strong>{' '}
                    <span className="text-muted-foreground">Public Files</span>
                  </span>
                </div>
              </div>

              {user?.profile?.bio && (
                <p className="mt-4 text-sm text-muted-foreground">
                  {user.profile.bio}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            {isOwnProfile && <TabsTrigger value="settings">Settings</TabsTrigger>}
          </TabsList>

          <TabsContent value="files" className="mt-6">
            <FileGrid files={userFiles} />
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Track your recent interactions and file activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No recent activity to show
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {isOwnProfile && (
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your profile settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Privacy Settings</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Account Privacy
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Followers
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Share2 className="h-4 w-4 mr-2" />
                        Sharing Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}