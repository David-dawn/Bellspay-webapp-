import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Shield, 
  Zap, 
  CreditCard, 
  Clock,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  FileText,
  XCircle,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your transactions are protected with industry-standard encryption and secure authentication.',
  },
  {
    icon: Zap,
    title: 'Instant Payments',
    description: 'No more failed transactions. Pay your fees instantly with guaranteed success.',
  },
  {
    icon: CreditCard,
    title: 'Multiple Payment Options',
    description: 'Pay via bank transfer, debit card, or USSD - whatever works best for you.',
  },
  {
    icon: Clock,
    title: 'Real-Time Tracking',
    description: 'Track your payment status in real-time and get instant confirmation.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Access and pay your fees from any device, anywhere, anytime.',
  },
  {
    icon: FileText,
    title: 'Digital Receipts',
    description: 'Download and share payment receipts instantly for your records.',
  },
];

const problems = [
  { icon: XCircle, text: 'Failed transactions with no refund' },
  { icon: AlertTriangle, text: 'Limited bank compatibility' },
  { icon: Clock, text: 'Long processing times' },
  { icon: XCircle, text: 'No payment tracking' },
];

const solutions = [
  { icon: CheckCircle2, text: '99.9% transaction success rate' },
  { icon: CheckCircle2, text: 'Works with all Nigerian banks' },
  { icon: CheckCircle2, text: 'Instant payment confirmation' },
  { icon: CheckCircle2, text: 'Real-time status updates' },
];

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up with your Bells University email and matriculation number.',
  },
  {
    number: '02',
    title: 'Select Payment Type',
    description: 'Choose from tuition, SIWES, SWEP, hostel, or other fees.',
  },
  {
    number: '03',
    title: 'Make Payment',
    description: 'Pay securely via bank transfer, card, or USSD.',
  },
  {
    number: '04',
    title: 'Get Your Receipt',
    description: 'Receive instant confirmation and download your receipt.',
  },
];

const faqs = [
  {
    question: 'Is Bells Pay official?',
    answer: 'Yes, Bells Pay is the official digital payment platform developed for Bells University of Technology students to simplify fee payments.',
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We support bank transfers from all Nigerian banks, debit/credit card payments, and USSD payments for those without internet banking.',
  },
  {
    question: 'How long does payment processing take?',
    answer: 'Most payments are processed instantly. You will receive your payment confirmation and receipt immediately after a successful transaction.',
  },
  {
    question: 'What if my payment fails?',
    answer: 'Unlike the old portal, Bells Pay has a 99.9% success rate. In rare cases of failure, your money is never debited, or refunded within 24 hours.',
  },
  {
    question: 'Can I pay for multiple semesters?',
    answer: 'Yes, you can make payments for any semester or session. Simply select the appropriate payment category and session during checkout.',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.03]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Now available for all Bells University students
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
              Pay Your School Fees
              <span className="block text-accent">Without the Stress</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Say goodbye to failed transactions and endless retries. Bells Pay makes tuition and fee payments fast, secure, and reliable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button size="xl" variant="hero" onClick={() => navigate('/register')}>
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="xl" variant="outline" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-muted-foreground mb-4">Trusted by Bells University Students</p>
              <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-foreground">5,000+</p>
                  <p className="text-sm">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-foreground">₦250M+</p>
                  <p className="text-sm">Processed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-foreground">99.9%</p>
                  <p className="text-sm">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Old Way vs. The New Way
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We understand the frustration of the current payment portal. That's why we built Bells Pay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Problems */}
            <div className="bg-card p-8 rounded-2xl border border-destructive/20 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">Old Payment Portal</h3>
              </div>
              <ul className="space-y-4">
                {problems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-card p-8 rounded-2xl border border-accent/20 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">Bells Pay</h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make your payment experience seamless.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-card p-6 rounded-2xl border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple 4-step process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-2xl font-display font-bold text-xl mb-4 shadow-elegant">
                    {step.number}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px] bg-border" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate('/register')}>
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 animate-fade-in">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Pay Your Fees?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join thousands of Bells University students who have already switched to a better payment experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="heroOutline"
              onClick={() => navigate('/register')}
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
