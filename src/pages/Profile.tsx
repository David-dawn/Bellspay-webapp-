import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/formatters';
import { 
  User, 
  Mail, 
  Hash, 
  GraduationCap, 
  Building2, 
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Bell,
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new.length < 8) {
      toast({
        variant: 'destructive',
        title: 'Password too short',
        description: 'New password must be at least 8 characters.',
      });
      return;
    }
    
    if (passwords.new !== passwords.confirm) {
      toast({
        variant: 'destructive',
        title: 'Passwords do not match',
        description: 'Please make sure your new passwords match.',
      });
      return;
    }
    
    // Simulate password change
    toast({
      title: 'Password updated',
      description: 'Your password has been changed successfully.',
    });
    setIsChangingPassword(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
              Profile & Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account information and preferences.
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden mb-6">
            <div className="bg-gradient-primary p-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-primary-foreground/20 rounded-2xl flex items-center justify-center border-2 border-primary-foreground/30">
                  <span className="font-display text-3xl font-bold text-primary-foreground">
                    {user?.fullName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-primary-foreground">
                  <h2 className="font-display text-2xl font-bold">{user?.fullName}</h2>
                  <p className="text-primary-foreground/70">{user?.matricNumber}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-foreground">{user?.fullName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground truncate">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Hash className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Matric Number</p>
                    <p className="font-medium text-foreground">{user?.matricNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium text-foreground">{user?.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="font-medium text-foreground">{user?.level}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium text-foreground">{user?.createdAt ? formatDate(user.createdAt) : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden mb-6">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Security</h3>
                  <p className="text-sm text-muted-foreground">Manage your account security</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!isChangingPassword ? (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your account password</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwords.current}
                        onChange={(e) => setPasswords(p => ({ ...p, current: e.target.value }))}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(s => ({ ...s, current: !s.current }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwords.new}
                        onChange={(e) => setPasswords(p => ({ ...p, new: e.target.value }))}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(s => ({ ...s, new: !s.new }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwords.confirm}
                        onChange={(e) => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(s => ({ ...s, confirm: !s.confirm }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswords({ current: '', new: '', confirm: '' });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Update Password
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden mb-6">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Preferences</h3>
                  <p className="text-sm text-muted-foreground">Customize your experience</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive payment confirmations via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="bg-card rounded-2xl border border-destructive/20 shadow-card overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-6 hover:bg-destructive/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-destructive" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-destructive">Sign Out</p>
                  <p className="text-sm text-muted-foreground">Sign out from your account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-destructive" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
