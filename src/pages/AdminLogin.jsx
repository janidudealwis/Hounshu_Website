import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { RateLimiter } from "../utils/security";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import { LenisProvider } from "../context/LenisContext";
import styles from "./AdminLogin.module.css";
import useScrollToTop from "../hooks/useScrollToTop";

// Rate limiter: 5 attempts per 15 minutes
const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000);

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdmin();

  useScrollToTop();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!username || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      // Check rate limiting
      const identifier = `login_${username}`;
      if (!loginRateLimiter.isAllowed(identifier)) {
        const remainingTime = Math.ceil(loginRateLimiter.getRemainingTime(identifier) / 60000);
        setError(`Too many failed attempts. Please try again in ${remainingTime} minutes.`);
        setIsLoading(false);
        return;
      }

      const success = login(username, password);

      if (success) {
        // Reset rate limiter on successful login
        loginRateLimiter.reset(identifier);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LenisProvider>
      <ScrollProgress />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.loginBox}>
            <h1 className={styles.title}>Admin Login</h1>
            <p className={styles.subtitle}>Honshu Enterprises Admin Panel</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.label}>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className={styles.footer}>
              Secure admin area - Unauthorized access is prohibited
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </LenisProvider>
  );
}
