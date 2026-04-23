import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>

        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/">
            <img src="/logo.png" alt="Honshu Enterprises" className={styles.logoImg} />
            <span className={styles.logoText}>
              <span className={styles.logoHonshu}>Honshu</span>
              <span className={styles.logoEnterprises}>Enterprises</span>
            </span>
          </Link>
        </div>

        {/* Desktop nav links */}
        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li className={styles.mobileOnly}>
            <Link to="/contact" className={styles.mobileCtaBtn} onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Right actions — always visible */}
        <div className={styles.rightActions}>
          {/* Desktop CTA */}
          <Link to="/contact" className={styles.ctaBtn}>Contact Us</Link>

          {/* Cart — visible on both desktop and mobile */}
          <Link to="/cart" className={styles.cartIcon} onClick={() => setMenuOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
