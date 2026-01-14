import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { 
  Menu, 
  X, 
  LogOut, 
  User, 
  LayoutDashboard,
  CreditCard,
  History,
  Settings
} from 'lucide-react';

interface NavbarProps {
  variant?: 'landing' | 'dashboard';
}

export function Navbar({ variant = 'landing' }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (variant === 'dashboard') {
    return (
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg font-display">B</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">Bells Pay</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                <LayoutDashboard className="w-4 h-4 inline-block mr-2" />
                Dashboard
              </Link>
              <Link to="/payment" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                <CreditCard className="w-4 h-4 inline-block mr-2" />
                Pay Fees
              </Link>
              <Link to="/history" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                <History className="w-4 h-4 inline-block mr-2" />
                History
              </Link>
              <Link to="/profile" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                <Settings className="w-4 h-4 inline-block mr-2" />
                Settings
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <div className="text-right mr-2">
                <p className="text-sm font-medium text-foreground">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">{user?.matricNumber}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border animate-slide-up">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link 
                to="/payment" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Pay Fees</span>
              </Link>
              <Link 
                to="/history" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <History className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Transaction History</span>
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Profile & Settings</span>
              </Link>
              <hr className="my-2 border-border" />
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </nav>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg font-display">B</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">Bells Pay</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Button onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Create Account
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <a 
              href="#features" 
              className="px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#faq" 
              className="px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <hr className="my-2 border-border" />
            {isAuthenticated ? (
              <Button className="w-full" onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" className="w-full" onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}>
                  Sign In
                </Button>
                <Button className="w-full" onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}>
                  Create Account
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
