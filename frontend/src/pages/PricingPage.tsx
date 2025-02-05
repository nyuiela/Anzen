import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, HardDrive, Shield, Zap } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '9.99',
      description: 'Perfect for personal use',
      storage: '100 GB',
      features: [
        'Basic file encryption',
        'Public file sharing',
        'Email support',
        'Basic analytics',
      ],
    },
    {
      name: 'Pro',
      price: '29.99',
      description: 'For professionals and small teams',
      storage: '1 TB',
      features: [
        'Advanced encryption',
        'Team collaboration',
        'Priority support',
        'Advanced analytics',
        'Custom branding',
        'API access',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '99.99',
      description: 'For large organizations',
      storage: '10 TB',
      features: [
        'Military-grade encryption',
        'Unlimited team members',
        '24/7 dedicated support',
        'Custom AI agents',
        'White-label solution',
        'SLA guarantee',
        'Custom integrations',
      ],
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your storage needs
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <Card className={`h-full ${
              plan.popular ? 'border-primary shadow-lg' : 'border-border'
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-2 text-lg">
                  <HardDrive className="h-5 w-5 text-primary" />
                  <span>{plan.storage} Storage</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">All Plans Include</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Security First</CardTitle>
              <CardDescription>
                Enterprise-grade security with end-to-end encryption
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Optimized for speed with global CDN distribution
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <HardDrive className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Reliable Storage</CardTitle>
              <CardDescription>
                99.99% uptime with redundant storage
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: "How is my data protected?",
              a: "Your data is protected with military-grade encryption and stored across multiple secure locations."
            },
            {
              q: "Can I upgrade my plan later?",
              a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
            },
            {
              q: "Do you offer refunds?",
              a: "Yes, we offer a 30-day money-back guarantee on all plans."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, PayPal, and cryptocurrency."
            }
          ].map((faq) => (
            <Card key={faq.q}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
                <CardDescription>{faq.a}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground">
          Join thousands of users who trust OnchainVault with their data
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Start Free Trial</Button>
          <Button size="lg" variant="outline">Contact Sales</Button>
        </div>
      </section>
    </div>
  );
}
