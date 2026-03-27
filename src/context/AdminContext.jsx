import React, { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  // Check if admin is logged in from localStorage on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminSession");
    if (storedAdmin) {
      const { email, timestamp } = JSON.parse(storedAdmin);
      // Session expires after 24 hours
      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - timestamp < dayInMs) {
        setIsAdminLoggedIn(true);
        setAdminEmail(email);
      } else {
        localStorage.removeItem("adminSession");
      }
    }
  }, []);

  const login = (username, password) => {
    // NOTE: This is a temporary solution. Client-side authentication is NOT secure.
    // For production, migrate to Supabase Auth with Row Level Security (RLS)
    const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error("Admin credentials not configured in environment variables");
      return false;
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const sessionData = {
        username,
        timestamp: Date.now(),
      };
      localStorage.setItem("adminSession", JSON.stringify(sessionData));
      setIsAdminLoggedIn(true);
      setAdminEmail(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminSession");
    setIsAdminLoggedIn(false);
    setAdminEmail("");
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminEmail,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
