import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Hash, GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import logo from '/images/logo.png';

const departments = [
  'Computer Science',
  'Accounting',
  'Business Administration',
  'Economics',
  'Mass Communication',
  'Industrial Chemistry',
  'Biochemistry',
  'Microbiology',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
];

const levels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level'];

export default function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    matricNumber: '',
    department: '',
    level: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.toLowerCase().endsWith('@bellsuniversity.edu.ng')) {
      newErrors.email = 'Please use your Bells University email';
    }
    
    if (!formData.matricNumber) {
      newErrors.matricNumber = 'Matriculation number is required';
    } else if (!/^BU\/\d{2}\/\d{5}$/i.test(formData.matricNumber)) {
      newErrors.matricNumber = 'Format: BU/XX/XXXXX';
    }
    
    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }
    
    if (!formData.level) {
      newErrors.level = 'Please select your level';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      matricNumber: formData.matricNumber.toUpperCase(),
      password: formData.password,
      department: formData.department,
      level: formData.level,
    });
    setIsLoading(false);
    
    if (result.success) {
      toast({
        title: 'Account created!',
        description: 'Welcome to Bells Pay. You can now start making payments.',
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: result.error,
      });
    }
  };

  const requirements = [
    { met: formData.fullName.trim().length >= 3, text: 'Full name (3+ characters)' },
    { met: formData.email.toLowerCase().endsWith('@bellsuniversity.edu.ng'), text: 'Bells University email' },
    { met: /^BU\/\d{2}\/\d{5}$/i.test(formData.matricNumber), text: 'Valid matric number' },
    { met: formData.password.length >= 8, text: 'Password (8+ characters)' },
    { met: formData.password === formData.confirmPassword && formData.confirmPassword.length > 0, text: 'Passwords match' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 py-12">
        <div className="mx-auto w-full max-w-md">
          <Link 
            to="/" 
            className="inline-flex ml-[-25rem] items-center gap-2 text-[#000000] hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 " />
            Back to home
          </Link>

          <div className="mb-8">
            <Link to="/" className="flex items-center gap-3 mb-6">
             
                <img src={logo} alt="Bells Pay Logo" width={52} height={52} />
             
              <span className="font-display font-bold text-[25px] text-[#2A38CC]">Bells Pay</span>
            </Link>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Sign up with your Bells University credentials to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Adeyemi"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`pl-10 h-12 ${errors.fullName ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Bells University Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@bellsuniversity.edu.ng"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 h-12 ${errors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="matricNumber">Matriculation Number</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="matricNumber"
                  type="text"
                  placeholder="BU/21/04560"
                  value={formData.matricNumber}
                  onChange={(e) => handleInputChange('matricNumber', e.target.value.toUpperCase())}
                  className={`pl-10 h-12 ${errors.matricNumber ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.matricNumber && (
                <p className="text-sm text-destructive">{errors.matricNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => handleInputChange('department', value)}
                >
                  <SelectTrigger className={`h-12 ${errors.department ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-destructive">{errors.department}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Level</Label>
                <Select 
                  value={formData.level} 
                  onValueChange={(value) => handleInputChange('level', value)}
                >
                  <SelectTrigger className={`h-12 ${errors.level ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.level && (
                  <p className="text-sm text-destructive">{errors.level}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`pl-10 pr-10 h-12 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 bg-[#2A38CC]" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#000000]">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#1EB32A] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Requirements */}
      {/* <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-12 h-12" />
            <div>
              <h2 className="font-display text-2xl font-bold">Join Bells Pay</h2>
              <p className="text-primary-foreground/70">Quick registration checklist</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {requirements.map((req, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                  req.met 
                    ? 'bg-primary-foreground/10 border border-primary-foreground/20' 
                    : 'bg-primary-foreground/5'
                }`}
              >
                <CheckCircle2 
                  className={`w-5 h-5 shrink-0 ${
                    req.met ? 'text-accent' : 'text-primary-foreground/30'
                  }`} 
                />
                <span className={req.met ? 'text-primary-foreground' : 'text-primary-foreground/50'}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
