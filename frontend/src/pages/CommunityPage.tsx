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
  Users,
  MessageSquare,
  Github,
  Twitter,
  Discord,
  Award,
  Heart,
  Sparkles,
} from 'lucide-react';

export default function CommunityPage() {
  const events = [
    {
      title: "OnchainVault Hackathon",
      date: "June 15-17, 2024",
      description: "Join us for a 3-day virtual hackathon building on OnchainVault",
      link: "#",
    },
    {
      title: "Community Call",
      date: "Every Thursday",
      description: "Weekly community updates and discussions",
      link: "#",
    },
  ];

  const contributors = [
    {
      name: "Alex Rivers",
      role: "Core Contributor",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=alex",
      contributions: 156,
    },
    {
      name: "Sarah Chen",
      role: "Documentation Lead",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=sarah",
      contributions: 89,
    },
    {
      name: "Marcus Kim",
      role: "Community Manager",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=marcus",
      contributions: 134,
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
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            Join Our Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with developers, creators, and enthusiasts building the future of
            decentralized storage
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="gap-2">
              <Discord className="h-5 w-5" /> Join Discord
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Github className="h-5 w-5" /> Contribute
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <Users className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>10,000+</CardTitle>
            <CardDescription>Community Members</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>50,000+</CardTitle>
            <CardDescription>Discord Messages</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <Github className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>1,000+</CardTitle>
            <CardDescription>Github Contributors</CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Events Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.title} className="gold-border">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{event.description}</p>
                <Button variant="outline" asChild>
                  <a href={event.link}>Learn More</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Contributors */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Top Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contributors.map((contributor) => (
            <Card key={contributor.name} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 rounded-full overflow-hidden gold-border p-1">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </div>
                <CardTitle>{contributor.name}</CardTitle>
                <CardDescription>{contributor.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span>{contributor.contributions} contributions</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Connect With Us</h2>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="lg" className="gap-2">
            <Twitter className="h-5 w-5" /> Twitter
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Discord className="h-5 w-5" /> Discord
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Github className="h-5 w-5" /> Github
          </Button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-2xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <Sparkles className="h-8 w-8 mx-auto text-primary" />
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="text-muted-foreground">
            Subscribe to our newsletter for the latest updates, tutorials, and community news
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-md bg-secondary px-4 py-2"
          />
          <Button>Subscribe</Button>
        </div>
      </section>
    </div>
  );
}
