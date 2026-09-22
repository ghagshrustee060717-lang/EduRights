import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AuthContext = createContext(null);

const API_BASE = '/api';

const parseResponse = async (res) => {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (err) {
    if (!res.ok) {
      if (res.status === 502 || res.status === 503 || res.status === 504) {
        throw new Error('Unable to connect to the EduRights backend server. Please ensure the backend is running on port 5000.');
      }
      throw new Error(`Server error (${res.status}): ${res.statusText || 'Connection issue'}`);
    }
    throw new Error('Invalid response from server.');
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('edurights_token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Trigger playful celebration confetti
  const celebrate = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#fbbf24', '#10b981', '#f43f5e', '#8b5cf6'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  // Verify and hydrate current user on refresh
  useEffect(() => {
    const hydrateUser = async () => {
      const savedToken = localStorage.getItem('edurights_token');
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });
        const data = await parseResponse(res);

        if (res.ok && data.success && data.user) {
          setUser(data.user);
          setToken(savedToken);
        } else {
          // Token expired or invalid
          localStorage.removeItem('edurights_token');
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
      } finally {
        setLoading(false);
      }
    };

    hydrateUser();
  }, []);

  // Login handler
  const login = async (email, password) => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await parseResponse(res);

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check your email and password.');
      }

      localStorage.setItem('edurights_token', data.token);
      setToken(data.token);
      setUser(data.user);
      celebrate();
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  // 1-Click Demo Login as Aarav
  const demoLogin = async () => {
    return await login('aarav@edurights.org', 'explorer123');
  };

  // Register handler
  const register = async (userData) => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await parseResponse(res);

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed. Please check your information.');
      }

      localStorage.setItem('edurights_token', data.token);
      setToken(data.token);
      setUser(data.user);
      celebrate();
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('edurights_token');
    setToken(null);
    setUser(null);
    setError(null);
  };

  // Update profile
  const updateProfile = async (updates) => {
    if (!token) return { success: false, message: 'Not logged in' };
    try {
      const res = await fetch(`${API_BASE}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await parseResponse(res);
      if (!res.ok || !data.success) throw new Error(data.message || 'Update failed');

      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Live gamification reward
  const awardPoints = async (points = 50, badge = null) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/users/award-points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ points, badge }),
      });
      const data = await parseResponse(res);
      if (res.ok && data.success && data.user) {
        setUser(data.user);
        celebrate();
      }
    } catch (err) {
      console.error('Award points error:', err);
    }
  };

  // Refresh user data from backend
  const refreshUser = async () => {
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await parseResponse(res);
      if (res.ok && data.success && data.user) {
        setUser(data.user);
        return data.user;
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
    return null;
  };

  // Immediate state update after quiz completion
  const updateUserGamification = (gamificationData) => {
    if (!gamificationData) return;
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...gamificationData,
      };
    });
    celebrate();
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    demoLogin,
    register,
    logout,
    updateProfile,
    awardPoints,
    refreshUser,
    updateUserGamification,
    celebrate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
