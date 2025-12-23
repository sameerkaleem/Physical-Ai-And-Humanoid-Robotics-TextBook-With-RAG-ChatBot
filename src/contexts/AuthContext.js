import React, { useState, useContext, createContext } from 'react';

// Create authentication context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: 1,
            email: email,
            name: email.split('@')[0],
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
          };

          // Store in localStorage
          localStorage.setItem('authToken', 'fake-jwt-token');
          localStorage.setItem('userData', JSON.stringify(userData));

          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Handle SSR case where context might not be available
  if (!context && typeof window === 'undefined') {
    // Return a default state during SSR
    return {
      user: null,
      login: () => Promise.reject(new Error('Login not available during SSR')),
      logout: () => {},
      loading: true
    };
  }

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};