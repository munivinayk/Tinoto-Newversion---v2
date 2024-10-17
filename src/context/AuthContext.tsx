import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthResponse } from '@supabase/supabase-js';
import { supabase, isSupabaseAvailable } from '../supabaseClient';

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  isOffline: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      const available = await isSupabaseAvailable();
      setIsOffline(!available);
      if (!available) {
        // Load user from local storage if Supabase is unavailable
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } else {
        const session = await supabase.auth.getSession();
        setUser(session?.data.session?.user ?? null);
      }
    };

    checkSupabaseConnection();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        localStorage.setItem('user', JSON.stringify(session.user));
      } else {
        localStorage.removeItem('user');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    if (isOffline) {
      // Simulate signup in offline mode
      const fakeUser = { id: 'offline-user', email };
      setUser(fakeUser);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      return { data: { user: fakeUser }, error: null } as AuthResponse;
    }
    return supabase.auth.signUp({ email, password });
  };

  const signIn = async (email: string, password: string) => {
    if (isOffline) {
      // Simulate signin in offline mode
      const fakeUser = { id: 'offline-user', email };
      setUser(fakeUser);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      return { data: { user: fakeUser }, error: null } as AuthResponse;
    }
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signInWithGoogle = async () => {
    if (isOffline) {
      throw new Error('Cannot sign in with Google in offline mode');
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  };

  const signInWithFacebook = async () => {
    if (isOffline) {
      throw new Error('Cannot sign in with Facebook in offline mode');
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (isOffline) {
      setUser(null);
      localStorage.removeItem('user');
      return;
    }
    return supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signInWithGoogle, signInWithFacebook, signOut, isOffline }}>
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