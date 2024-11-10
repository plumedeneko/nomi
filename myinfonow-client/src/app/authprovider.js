import React, { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

export default function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Ensure we are on the client side before accessing localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
      
      setIsAuthenticated(!!token);
      setUsername(storedUsername || "");
    }
  }, []);

  const login = (token, username) => {
    if (typeof window !== "undefined") {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      setUsername(username);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setIsAuthenticated(false);
      setUsername("");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
