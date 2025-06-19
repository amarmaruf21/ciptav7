import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data for development
  const mockUsers: User[] = [
    { username: 'admin1', role: 'Admin', id_terkait: 'ADM001' },
    { username: 'koordinator1', role: 'Koordinator', id_terkait: 'KOR001' },
    { username: 'koordinator2', role: 'Koordinator', id_terkait: 'KOR002' },
    { username: 'anggota1', role: 'Anggota', id_terkait: 'ANG001' },
    { username: 'anggota2', role: 'Anggota', id_terkait: 'ANG002' },
  ];

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('cipta_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('cipta_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.username === username);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('cipta_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cipta_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};