import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    
    if (result.success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Sign in failed',
        description: result.error,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="mb-8">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg font-display">B</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">Bells Pay</span>
            </Link>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your account and manage your payments.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@bellsuniversity.edu.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 h-12 ${errors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-accent hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 h-12 ${errors.password ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">
                  Demo credentials
                </span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm">
              <p className="text-muted-foreground">
                <strong>Email:</strong> student@bellsuniversity.edu.ng
              </p>
              <p className="text-muted-foreground">
                <strong>Password:</strong> password123
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-accent hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground text-center">
          <div className="w-20 h-20 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-primary-foreground/20">
            <span className="font-display font-bold text-4xl">B</span>
          </div>
          <h2 className="font-display text-3xl font-bold mb-4">
            Secure & Reliable
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Your transactions are protected with bank-level security. Pay your fees with confidence knowing your money is safe.
          </p>
        </div>
      </div>
    </div>
  );
}
