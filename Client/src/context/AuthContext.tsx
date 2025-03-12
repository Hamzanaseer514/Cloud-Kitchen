import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: object) => Promise<void>;
  register: (userData: Partial<User>, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Customer',
    email: 'customer@example.com',
    password: 'password123',
    role: 'customer' as UserRole,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Sarah Chef',
    email: 'chef@example.com',
    password: 'password123',
    role: 'chef' as UserRole,
    bio: 'Passionate about home cooking',
    specialties: ['Indian', 'Italian'],
    rating: 4.8,
    totalReviews: 24,
    isVerified: true,
    earnings: 1250,
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Mike Rider',
    email: 'rider@example.com',
    password: 'password123',
    role: 'rider' as UserRole,
    isAvailable: true,
    vehicleType: 'Motorcycle',
    vehicleNumber: 'AB123',
    deliveriesCompleted: 156,
    rating: 4.7,
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin' as UserRole,
    createdAt: new Date(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('cloudKitchenUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (user: object) => {
    setIsLoading(true);
    try {
      // // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000));
      
      // const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      // if (!foundUser) {
      //   throw new Error('Invalid credentials');
      // }
      
      // // Remove password before storing
      // const { password: _, ...userWithoutPassword } = foundUser;
      // setUser(userWithoutPassword as User);
      localStorage.setItem('cloudKitchenUser', JSON.stringify(user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === userData.email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
        ...userData,
        role,
        createdAt: new Date(),
      } as User;
      
      // In a real app, we would save this to the database
      // MOCK_USERS.push({ ...newUser, password });
      
      setUser(newUser);
      localStorage.setItem('cloudKitchenUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cloudKitchenUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};