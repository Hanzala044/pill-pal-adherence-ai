
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a mock user for development with a valid UUID
const mockUser = {
  id: "00000000-0000-0000-0000-000000000000", // Valid UUID format
  aud: "authenticated",
  role: "authenticated",
  email: "dev@example.com",
  app_metadata: {},
  user_metadata: { full_name: "Development User" },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
} as User;

// Create a mock session for development
const mockSession = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  expires_in: 3600,
  expires_at: 9999999999,
  token_type: "bearer",
  user: mockUser,
} as Session;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [session, setSession] = useState<Session | null>(mockSession);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Since we're bypassing auth, we don't need the real auth state listener
  // but we'll keep empty implementations of the functions for compatibility

  const signIn = async (email: string, password: string) => {
    toast({
      title: "Authentication disabled",
      description: "Login functionality is disabled. Using development user.",
    });
    return { error: null };
  };

  const signUp = async (email: string, password: string, name: string) => {
    toast({
      title: "Authentication disabled",
      description: "Signup functionality is disabled. Using development user.",
    });
    return { error: null };
  };

  const signOut = async () => {
    toast({
      title: "Authentication disabled",
      description: "Logout functionality is disabled.",
    });
    // We don't actually sign out in dev mode
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signIn,
        signUp,
        signOut,
        loading,
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
