import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface RegisterFormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

const RegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get('role') as UserRole) || 'customer';
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  
  const password = watch('password');
  
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const { confirmPassword, ...userData } = data;
  
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, role: "customer" }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }
  
      // Assuming registerUser is handling authentication context updates
      await registerUser(userData, data.password, selectedRole);
  
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900">Create an Account</h2>
        <p className="mt-2 text-gray-600">Join Cloud Kitchen today</p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      <div className="mb-6">
        {/* <label className="block text-sm font-medium text-gray-700 mb-1">
          I want to join as:
        </label> */}
        <div className="grid grid-cols-2 gap-4">
          {/* <button
            type="button"
            className={`py-3 px-4 border rounded-md flex items-center justify-center ${
              selectedRole === 'customer'
                ? 'bg-orange-50 border-orange-500 text-orange-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRole('customer')}
          >
            <User className="h-5 w-5 mr-2" />
            Customer
          </button> */}
          {/* <button
            type="button"
            className={`py-3 px-4 border rounded-md flex items-center justify-center ${
              selectedRole === 'chef'
                ? 'bg-orange-50 border-orange-500 text-orange-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRole('chef')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
              <line x1="6" y1="17" x2="18" y2="17"></line>
            </svg>
            Chef
          </button> */}
          {/* <button
            type="button"
            className={`py-3 px-4 border rounded-md flex items-center justify-center ${
              selectedRole === 'rider'
                ? 'bg-orange-50 border-orange-500 text-orange-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRole('rider')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
            </svg>
            Rider
          </button> */}
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            label="Full Name"
            leftIcon={<User className="h-5 w-5 text-gray-400" />}
            error={errors.fullname?.message}
            {...register('fullname', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
          />
        </div>
        
        <div>
          <Input
            label="Email Address"
            type="email"
            leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
        </div>
        
        <div>
          <Input
            label="Phone Number (Optional)"
            type="tel"
            leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
            error={errors.phone?.message}
            {...register('phone', {
              pattern: {
                value: /^[0-9+\-\s()]*$/,
                message: 'Invalid phone number',
              },
            })}
          />
        </div>
        
        <div>
          <Input
            label="Password"
            type="password"
            leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
        </div>
        
        <div>
          <Input
            label="Confirm Password"
            type="password"
            leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match',
            })}
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{' '}
            <Link to="/terms" className="text-orange-600 hover:text-orange-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-orange-600 hover:text-orange-500">
              Privacy Policy
            </Link>
          </label>
        </div>
        
        <div>
          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;