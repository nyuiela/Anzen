import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Calendar, User, Tag } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Introducing Zero-Knowledge Storage",
      excerpt: "Learn how we're implementing zero-knowledge proofs for secure file storage",
      author: "Alex Rivers",
      date: "March 15, 2024",
      tags: ["Security", "Zero-Knowledge", "Tech"],
      image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=800",
    },
    {
      id: 2,
      title: "The Future of Decentralized Storage",
      excerpt: "Exploring the possibilities of blockchain-based file storage systems",
      author: "Sarah Chen",
      date: "March 10, 2024",
      tags: ["Blockchain", "IPFS", "Future"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800",
    },
    {
      id: 3,
      title: "AI-Powered File Management",
      excerpt: "How AI agents are revolutionizing the way we organize and access files",
      author: "Marcus Kim",
      date: "March 5, 2024",
      tags: ["AI", "Innovation", "Tech"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800",
    }
  ]; // No trailing comma before closing bracket
  
  

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold gradient-text">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Latest updates, tutorials, and insights from the OnchainVault team
        </p>
      </motion.div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Featured Post */}
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-video">
            <img
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800"
              alt="Featured post"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>Featured</span>
              </div>
              <h2 className="text-2xl font-bold">The Future of Decentralized Storage</h2>
              <p className="text-muted-foreground">
                Exploring the possibilities of blockchain-based file storage systems and how
                they're revolutionizing data management.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Sarah Chen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>March 10, 2024</span>
                </div>
              </div>
              <Button className="w-fit">
                Read More <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="aspect-video">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Subscribe to Our Newsletter</CardTitle>
          <CardDescription>
            Get the latest updates delivered directly to your inbox
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input placeholder="Enter your email" type="email" />
            <Button>Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
