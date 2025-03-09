import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkUserAuthentication(token);
    } else {
      setLoading(false);
    }
  }, []);

  const checkUserAuthentication = async (token) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("http://localhost:3000/api/users/me");
      setCurrentUser(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Authentication error:", err);
      localStorage.removeItem("token");
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError("");
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setCurrentUser(response.data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      setError("");
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setCurrentUser(response.data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
