'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from '@/src/services/api';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await auth.login({ email: formData.email, password: formData.password });
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await register({
          email: formData.email,
          password: formData.password
        });
      }
      onOpenChange(false);
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#1a1814] text-amber-100">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Login' : 'Register'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-transparent border-amber-100/20 text-amber-100"
            required
          />
          
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="bg-transparent border-amber-100/20 text-amber-100"
            required
          />
          
          {!isLogin && (
            <Input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="bg-transparent border-amber-100/20 text-amber-100"
              required
            />
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <div className="flex flex-col gap-2">
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-amber-100/20 hover:bg-amber-100/30 text-amber-100"
            >
              {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
            </Button>
            
            <Button 
              type="button"
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-100 hover:bg-amber-100/10"
            >
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 