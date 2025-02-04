import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Heart,
  MessageSquare,
  Share2,
  MoreVertical,
  Download,
  Edit,
  Trash,
  Lock,
  Users,
  Globe,
  FileIcon,
  Clock,
  ThumbsUp,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function FileDetailsPage() {
  const { id } = useParams();
  const { files } = useStore();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);

  const file = files.find((f) => f.id === id);

  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <FileIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">File Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The file you're looking for doesn't exist or you don't have permission to
          view it.
        </p>
        <Button asChild>
          <Link to="/explore">Browse Files</Link>
        </Button>
      </div>
    );
  }

  const handleComment = () => {
    if (comment.trim()) {
      // Add comment logic here
      setComment('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-3 gap-8"
      >
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {file.name}
                    {file.privacy === 'private' && (
                      <Lock className="h-4 w-4 text-primary" />
                    )}
                    {file.privacy === 'shared' && (
                      <Users className="h-4 w-4 text-primary" />
                    )}
                    {file.privacy === 'public' && (
                      <Globe className="h-4 w-4 text-primary" />
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4" />
                    {formatDistanceToNow(file.uploadedAt, { addSuffix: true })}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              {file.thumbnail ? (
                <img
                  src={file.thumbnail}
                  alt={file.name}
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <FileIcon className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLiked(!liked)}
                  className={liked ? 'text-primary' : ''}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${
                      liked ? 'fill-current' : ''
                    }`}
                  />
                  {file.likes + (liked ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {file.comments}
                </Button>
              </div>
              <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share File</DialogTitle>
                    <DialogDescription>
                      Share this file with others
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm font-medium">Share Link</label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          readOnly
                          value={`https://onchainvault.com/file/${file.id}`}
                        />
                        <Button>Copy</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Privacy Setting
                      </label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <Button
                          variant={
                            file.privacy === 'private' ? 'default' : 'outline'
                          }
                          className="flex-1"
                        >
                          <Lock className="h-4 w-4 mr-2" /> Private
                        </Button>
                        <Button
                          variant={
                            file.privacy === 'shared' ? 'default' : 'outline'
                          }
                          className="flex-1"
                        >
                          <Users className="h-4 w-4 mr-2" /> Shared
                        </Button>
                        <Button
                          variant={
                            file.privacy === 'public' ? 'default' : 'outline'
                          }
                          className="flex-1"
                        >
                          <Globe className="h-4 w-4 mr-2" /> Public
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-lighter overflow-hidden">
                    <img
                      src="https://api.dicebear.com/7.x/personas/svg?seed=comment"
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button
                      onClick={handleComment}
                      disabled={!comment.trim()}
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-lighter overflow-hidden">
                        <img
                          src={`https://api.dicebear.com/7.x/personas/svg?seed=user${i}`}
                          alt="Avatar"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">User {i}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="mt-1">
                        This is a sample comment {i}. Great file!
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" /> 5
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>File Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Owner</label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-8 w-8 rounded-full bg-primary-lighter overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/personas/svg?seed=${file.owner}`}
                      alt="Owner"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Link
                    to={`/profile/${file.owner}`}
                    className="text-sm hover:underline"
                  >
                    {file.owner}
                  </Link>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">File Type</label>
                <p className="text-sm text-muted-foreground mt-1">
                  {file.type}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Size</label>
                <p className="text-sm text-muted-foreground mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Privacy</label>
                <p className="text-sm text-muted-foreground mt-1 capitalize">
                  {file.privacy}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">IPFS CID</label>
                <p className="text-sm text-muted-foreground mt-1 break-all">
                  {file.cid}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {files
                  .filter(
                    (f) =>
                      f.id !== file.id &&
                      f.type === file.type &&
                      f.privacy === 'public'
                  )
                  .slice(0, 3)
                  .map((similarFile) => (
                    <Link
                      key={similarFile.id}
                      to={`/file/${similarFile.id}`}
                      className="block"
                    >
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                        {similarFile.thumbnail ? (
                          <img
                            src={similarFile.thumbnail}
                            alt={similarFile.name}
                            className="h-12 w-12 rounded object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded bg-background flex items-center justify-center">
                            <FileIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {similarFile.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(similarFile.uploadedAt, {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}