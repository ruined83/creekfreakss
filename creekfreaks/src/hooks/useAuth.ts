import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckLoading, setAdminCheckLoading] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Defer admin check with setTimeout to avoid deadlock
        if (session?.user) {
          setAdminCheckLoading(true);
          // FORCE ADMIN for verified owner to bypass any browser/network glitches
          if (session.user.email === 'ruinedshaman@gmail.com' || session.user.email === 'creekfreak@creek-freaks.com') {
            console.log("👑 Owner identified: Granting admin privileges immediately.");
            setIsAdmin(true);
          }
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setAdminCheckLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setAdminCheckLoading(true);
        if (session.user.email === 'ruinedshaman@gmail.com' || session.user.email === 'creekfreak@creek-freaks.com') {
          setIsAdmin(true);
        }
        checkAdminRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    console.log('Checking admin role for user:', userId);

    // Query user_roles directly instead of using RPC to avoid type issues
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    console.log('Admin check result:', { data, error });

    if (!error) {
      const isAdminUser = data !== null;
      console.log('Setting isAdmin to:', isAdminUser);
      setIsAdmin(isAdminUser);
    } else {
      console.error('Error checking admin role:', error);
    }
    setAdminCheckLoading(false);
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    isAdmin,
    adminCheckLoading,
    signIn,
    signUp,
    signOut,
  };
}
