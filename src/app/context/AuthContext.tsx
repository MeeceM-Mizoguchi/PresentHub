import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<Pick<UserProfile, 'name'>>) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const timeout = new Promise<null>(resolve => setTimeout(() => resolve(null), 5000));
  const query = supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
    .then(({ data }) => data as UserProfile | null);
  return Promise.race([query, timeout]);
}

async function ensureProfile(user: import('@supabase/supabase-js').User): Promise<UserProfile | null> {
  let profile = await fetchProfile(user.id);
  if (!profile) {
    await supabase.from('user_profiles').upsert({
      id: user.id,
      email: user.email ?? '',
      name: (user.user_metadata?.name as string) ?? '',
      role: 'user',
    }, { onConflict: 'id' });
    profile = await fetchProfile(user.id);
  }
  // email が空の場合は auth user の email で補完
  if (profile && !profile.email && user.email) {
    profile = { ...profile, email: user.email };
  }
  return profile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetchSeq ensures that only the result of the latest profile fetch is applied.
    // Without this, a slow/failed re-fetch (e.g. on TOKEN_REFRESHED) would overwrite
    // a correctly-loaded profile with null.
    let fetchSeq = 0;

    // onAuthStateChange fires immediately with INITIAL_SESSION, so getSession() is not needed.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const seq = ++fetchSeq;
        try {
          const p = await ensureProfile(session.user);
          if (seq === fetchSeq) setProfile(p);
        } catch {
          if (seq === fetchSeq) setProfile(null);
        }
      } else {
        fetchSeq++;
        setProfile(null);
      }

      setIsLoading(false);
    });

    // Fallback: stop loading if the event never fires (e.g. no network)
    const timer = setTimeout(() => setIsLoading(false), 5000);

    return () => { fetchSeq++; clearTimeout(timer); subscription.unsubscribe(); };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error?.message ?? null };
  };

  const updateProfile = async (updates: Partial<Pick<UserProfile, 'name'>>) => {
    if (!user) return 'Not authenticated';
    const current = profile ?? { id: user.id, email: user.email ?? '', name: '', role: 'user' as const };
    const { error } = await supabase.from('user_profiles').upsert(
      { ...current, ...updates },
      { onConflict: 'id' }
    );
    if (error) return error.message;
    setProfile(prev => prev ? { ...prev, ...updates } : { ...current, ...updates });
    return null;
  };

  return (
    <AuthContext.Provider value={{
      user, profile, session,
      isAdmin: profile?.role === 'admin',
      isLoading,
      signIn, signOut, resetPassword, updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
