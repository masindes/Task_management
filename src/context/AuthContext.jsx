import React, { createContext, useState, useNavigate, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Base URL for the backend
  const BASE_URL = "https://task-managent-backend.onrender.com";
  // Login function
  const login = async (username, password) => {
    try {
      console.log("Sending login request...");
      const response = await axios.post(`${BASE_URL}/login`, { username, password });
      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        throw new Error(error.response.data.error || "Login failed");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        throw new Error("No response from server. Please check your connection.");
      } else {
        console.error("Error setting up request:", error.message);
        throw new Error("An error occurred. Please try again.");
      }
    }
  };

  // Register function
  const register = async (username, email, password, name) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, {
        username,
        email,
        password,
        name,
      });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;