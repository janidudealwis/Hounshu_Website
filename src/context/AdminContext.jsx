import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const AdminContext = createContext();
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminSession");
    if (storedAdmin) {
      const { username, timestamp } = JSON.parse(storedAdmin);
      if (Date.now() - timestamp < SESSION_DURATION_MS) {
        setIsAdminLoggedIn(true);
        setAdminEmail(username);
      } else {
        localStorage.removeItem("adminSession");
      }
    }
  }, []);

  const login = useCallback((username, password) => {
    const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) return false;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(
        "adminSession",
        JSON.stringify({ username, timestamp: Date.now() }),
      );
      setIsAdminLoggedIn(true);
      setAdminEmail(username);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("adminSession");
    setIsAdminLoggedIn(false);
    setAdminEmail("");
  }, []);

  const value = useMemo(
    () => ({ isAdminLoggedIn, adminEmail, login, logout }),
    [isAdminLoggedIn, adminEmail, login, logout],
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
