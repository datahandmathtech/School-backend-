"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Determine base URL dynamically. In production, relative path `/api` is used.
    const getApiUrl = () => {
      return process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '');
    };

    const checkAuth = async () => {
      try {
        // Temporarily bypass the fetch to avoid ERR_CONNECTION_REFUSED when backend is down
        /*
        const response = await fetch(`${getApiUrl()}/api/auth/me`, {
          credentials: 'include',
        });
        
        // Don't log 401 as an error, it just means the user isn't logged in
        if (!response.ok) {
          if (response.status === 401) return; 
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === "success") {
          setUser(data.data.user);
        }
        */
      } catch (error) {
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
          // Backend not running, which is fine for UI testing
        } else {
          console.warn("Auth check failed:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    router.push("/admin");
  };

  const logout = async () => {
    try {
      const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '');
      await fetch(`${getApiUrl()}/api/auth/logout`, {
        credentials: 'include',
      });
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
