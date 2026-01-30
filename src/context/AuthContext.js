import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id, session.user.email);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfile(session.user.id, session.user.email);
      } else {
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch user profile from admin_users table (or create if not exists)
  const fetchUserProfile = async (userId, userEmail = null) => {
    try {
      // First try to get existing profile
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId);

      if (error) {
        console.error('Error fetching profile:', error.message);
        return;
      }

      // If profile exists, use it
      if (data && data.length > 0) {
        console.log('✅ User profile found:', data[0]);
        setUserProfile(data[0]);
      } else {
        // Profile doesn't exist, create it
        console.log('⚠️ No profile found, creating one...');
        const email = userEmail || user?.email;
        if (email) {
          const { data: newProfile, error: insertError } = await supabase
            .from('admin_users')
            .insert([{ id: userId, email: email, role: 'admin' }])
            .select()
            .single();

          if (insertError) {
            console.error('Error creating profile:', insertError.message);
          } else {
            console.log('✅ Profile created:', newProfile);
            setUserProfile(newProfile);
          }
        }
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    }
  };

  // Login with email/password
  const login = async (email, password) => {
    console.log('Logging in:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Login error:', error.message);
      throw error;
    }

    console.log('Login successful:', data.user?.email);
    return data;
  };

  // Sign up new user
  const signup = async (email, password, fullName = '') => {
    console.log('Signing up:', email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      console.error('Signup error:', error.message);
      throw error;
    }

    console.log('Signup successful:', data.user?.email);
    return data;
  };

  // Logout
  const logout = async () => {
    console.log('Logging out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    }
    setUser(null);
    setUserProfile(null);
  };

  // Update user profile
  const updateProfile = async (updates) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setUserProfile(data);
      return data;
    } catch (err) {
      console.error('Update profile error:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      login,
      signup,
      logout,
      updateProfile,
      fetchUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
