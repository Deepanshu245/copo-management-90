import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, UserProfile } from '@/services/auth';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'faculty' | 'hod' | 'accreditation_officer' | 'student';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load token from localStorage on app start
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Get tokens from Django API
      const { access, refresh } = await authService.login({ username, password });
      
      // Store tokens
      localStorage.setItem('token', access);
      localStorage.setItem('refresh_token', refresh);
      setToken(access);
      
      // Get user profile
      const userProfile = await authService.getCurrentUser();
      const user: User = {
        id: userProfile.id,
        username: userProfile.username,
        email: userProfile.email,
        role: userProfile.role,
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error: any) {
      const message = error.response?.data?.detail || error.message || 'Invalid credentials';
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};