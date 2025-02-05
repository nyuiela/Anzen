import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Send,
  Clock,
} from 'lucide-react';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

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
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help with any questions about OnchainVault
          </p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <Mail className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>Email Us</CardTitle>
            <CardDescription>
              <a href="mailto:support@onchainvault.com" className="hover:text-primary">
                support@onchainvault.com
              </a>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>
              Available 24/7 for instant support
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <Phone className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle>Phone</CardTitle>
            <CardDescription>
              +1 (888) 123-4567
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Office Location</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                123 Blockchain Street, Crypto City, CC 12345
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800"
                  alt="Office"
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>When you can reach us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Saturday</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 4:00 PM EST</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Sunday</p>
                    <p className="text-sm text-muted-foreground">Closed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
