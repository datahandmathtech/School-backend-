"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.status === "success") {
        login(data.data.user);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-navy-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold-600/20">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Admin Login</h1>
          <p className="text-white/60">Yatree Destination Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/60 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white h-12 pl-12 rounded-xl focus:ring-gold-500"
                placeholder="admin@yatreedestination.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/60 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white h-12 pl-12 rounded-xl focus:ring-gold-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              {error}
            </p>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 bg-gold-600 hover:bg-gold-700 text-white text-lg font-bold rounded-xl transition-all"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Sign In to Dashboard"}
          </Button>
        </form>

        <p className="text-center mt-8 text-white/40 text-sm">
          Secure enterprise access. Managed by Yatree Destination.
        </p>
      </motion.div>
    </div>
  );
}
