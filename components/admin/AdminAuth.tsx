"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { auth } from "../../src/services/api";
import { AuthCredentials } from "@/src/services/types";

interface AdminAuthProps {
  onAuthenticated: () => void;
}

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [credentials, setCredentials] = useState<AuthCredentials>({ email: "admin@example.com", password: "" }); 
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await auth.login(credentials);
      if (response.data.token) {
        onAuthenticated();
      } 
      else if ((response.data as any).message === 'Email not found. Please register.') {
        alert('Email not found. Please register.');
        const response = await auth.register(credentials);
        if (response.status === 201) {
          onAuthenticated();
        }
      }
      else {
        setError("Invalid password");
      }
    } catch (error) {
      alert(error);
      setError("An error occurred during authentication");
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col items-center gap-4">
        <div className="p-3 rounded-full bg-neutral-800">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold">Admin Access</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} // Update email in state
              className="bg-neutral-800 border-neutral-700"
            />
          </div>
          <Input
            id="password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} // Update password in state
            className="bg-neutral-800 border-neutral-700"
          />
        </div>
        {error && <p className="text-red-4000 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}