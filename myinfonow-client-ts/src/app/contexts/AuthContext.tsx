"use client";


import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  // Helper to check if token is valid
  const isTokenValid = (token: string) => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  };

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    router.push("./login"); // Redirect to login page on logout
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && isTokenValid(storedToken)) {
      setToken(storedToken);
    } else {
      logout(); // Clear invalid or expired token
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// -----------
// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { useRouter } from "next/router";
// import {jwtDecode} from "jwt-decode";

// interface DecodedToken {
//   exp: number;
//   [key: string]: any;
// }

// interface AuthContextType {
//   token: string | null;
//   isLoggedIn: boolean;
//   login: (token: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setToken] = useState<string | null>(null);
//   const router = useRouter();

//   // Check if token is valid
//   const isTokenValid = (token: string): boolean => {
//     try {
//       const decoded: DecodedToken = jwtDecode(token);
//       return decoded.exp * 1000 > Date.now();
//     } catch (error) {
//       return false;
//     }
//   };

//   const login = (newToken: string) => {
//     setToken(newToken);
//     localStorage.setItem("token", newToken);
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken && isTokenValid(storedToken)) {
//       setToken(storedToken);
//     } else {
//       logout(); // Logout if token is invalid or expired
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


