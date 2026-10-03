import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "edurights_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================================
     LOAD USER FROM SAVED TOKEN
  ================================= */

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile(token);

        if (response.success) {
          setUser(response.user);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  /* ================================
     LOGIN
  ================================= */

  const login = (loginResponse) => {
    if (!loginResponse?.success || !loginResponse?.token) {
      throw new Error(
        loginResponse?.message || "Login failed"
      );
    }

    localStorage.setItem(TOKEN_KEY, loginResponse.token);

    setToken(loginResponse.token);
    setUser(loginResponse.user || null);
  };

  /* ================================
     REGISTER
  ================================= */

  const register = (registerResponse) => {
    if (!registerResponse?.success || !registerResponse?.token) {
      throw new Error(
        registerResponse?.message || "Registration failed"
      );
    }

    localStorage.setItem(TOKEN_KEY, registerResponse.token);

    setToken(registerResponse.token);
    setUser(registerResponse.user || null);
  };

  /* ================================
     LOGOUT
  ================================= */

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  /* ================================
     REFRESH PROFILE
  ================================= */

  const refreshProfile = async () => {
    if (!token) return null;

    try {
      const response = await getProfile(token);

      if (response.success) {
        setUser(response.user);
        return response.user;
      }

      return null;
    } catch (error) {
      console.error("Failed to refresh profile:", error);
      return null;
    }
  };

  /* ================================
     UPDATE PROFILE
  ================================= */

  const saveProfile = async (profileData) => {
    if (!token) {
      throw new Error("You must be logged in");
    }

    const response = await updateProfile(token, profileData);

    if (response.success) {
      setUser(response.user);
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: Boolean(token && user),
        login,
        register,
        logout,
        refreshProfile,
        saveProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}

export default AuthContext;