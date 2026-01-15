import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication functions
  const loginUser = (email) => {
    setUser({ email });
    localStorage.setItem("userLoggedIn", "true");
  };

  const loginAdmin = (email) => {
    setAdmin({ email });
    localStorage.setItem("adminLoggedIn", "true");
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("userLoggedIn");
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("adminLoggedIn");
  };

  const value = {
    user,
    admin,
    loginUser,
    loginAdmin,
    logoutUser,
    logoutAdmin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
