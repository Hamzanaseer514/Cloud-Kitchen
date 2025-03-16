import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("result",result)
      if (!response.ok) {
        throw new Error(result?.message || "Invalid email or password.");
      }

      const {success, token,user} = result;
      if(success){
        localStorage.setItem('cloudKitchenUser', JSON.stringify(user));
        localStorage.setItem('token', token);
      }
  
      // Assuming the API returns a token and user data
      await login(result.user);
      if(result.user.role === 'admin'){
        navigate("/admin-dashboard");
      }
      else if(result.user.role === 'chef'){
        navigate("/chef-dashboard");
      }
      else{
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-gray-600">Sign in to your Cloud Kitchen account</p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-orange-600 hover:text-orange-500">
              Forgot your password?
            </Link>
          </div>
        </div>
        
        <div>
          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-orange-600 hover:text-orange-500">
            Sign up
          </Link>
        </p>
      </div>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              onSubmit({ email: 'customer@example.com', password: 'password123' });
            }}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Customer Demo
          </button>
          <button
            type="button"
            onClick={() => {
              onSubmit({ email: 'chef@example.com', password: 'password123' });
            }}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Chef Demo
          </button>
          <button
            type="button"
            onClick={() => {
              onSubmit({ email: 'rider@example.com', password: 'password123' });
            }}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Rider Demo
          </button>
          <button
            type="button"
            onClick={() => {
              onSubmit({ email: 'admin@example.com', password: 'password123' });
            }}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Admin Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;