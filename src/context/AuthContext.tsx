import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  matricNumber: string;
  department: string;
  level: string;
  balance: number;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateBalance: (amount: number) => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  matricNumber: string;
  password: string;
  department: string;
  level: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user database
const MOCK_USERS: Record<string, { user: User; password: string }> = {
  'student@bellsuniversity.edu.ng': {
    user: {
      id: '1',
      fullName: 'John Adeyemi',
      email: 'student@bellsuniversity.edu.ng',
      matricNumber: 'BU/21/0456',
      department: 'Computer Science',
      level: '400 Level',
      balance: 45000,
      createdAt: new Date('2021-09-01'),
    },
    password: 'password123',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('bells_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const storedData = MOCK_USERS[email.toLowerCase()];
    
    if (!storedData) {
      setIsLoading(false);
      return { success: false, error: 'No account found with this email' };
    }
    
    if (storedData.password !== password) {
      setIsLoading(false);
      return { success: false, error: 'Incorrect password' };
    }
    
    setUser(storedData.user);
    localStorage.setItem('bells_user', JSON.stringify(storedData.user));
    setIsLoading(false);
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if email is Bells domain
    if (!data.email.toLowerCase().endsWith('@bellsuniversity.edu.ng')) {
      setIsLoading(false);
      return { success: false, error: 'Please use your Bells University email address' };
    }
    
    // Check if user exists
    if (MOCK_USERS[data.email.toLowerCase()]) {
      setIsLoading(false);
      return { success: false, error: 'An account already exists with this email' };
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      matricNumber: data.matricNumber,
      department: data.department,
      level: data.level,
      balance: 0,
      createdAt: new Date(),
    };
    
    MOCK_USERS[data.email.toLowerCase()] = {
      user: newUser,
      password: data.password,
    };
    
    setUser(newUser);
    localStorage.setItem('bells_user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bells_user');
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance - amount };
      setUser(updatedUser);
      localStorage.setItem('bells_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
