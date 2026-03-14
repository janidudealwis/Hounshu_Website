import React from "react";
import styles from "./Footer.module.css";
import useScrollReveal from "../hooks/useScrollReveal";

const quickLinks = [
  "Product Catalog",
  "Industrial Solutions",
  "Case Studies",
  "Technical Support",
];
const supportLinks = [
  "Help Center",
  "Spare Parts",
  "Warranty Info",
  "Contact Sales",
];

const Footer = () => {
  const topRef = useScrollReveal({ threshold: 0.05 });

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div ref={topRef} className={`${styles.top} reveal`}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img
                src="/logo.png"
                alt="Honshu Enterprises"
                className={styles.logoImg}
              />
              <span className={styles.logoText}>
                <span className={styles.logoHonshu}>Honshu</span>
                <span className={styles.logoEnterprises}> Enterprises</span>
              </span>
            </div>
            <p className={styles.brandDesc}>
              Leading the global industrial sector with precision Japanese
              engineering and sustainable power solutions since 1974.
            </p>
            <div className={styles.socials}>
              {/* Twitter/X */}
              <a href="#" aria-label="Twitter" className={styles.social}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className={styles.social}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Globe */}
              <a href="#" aria-label="Website" className={styles.social}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Support</h4>
            <ul className={styles.linkList}>
              {supportLinks.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* HQ */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact Info</h4>
            <p className={styles.address}>
              No. 215, 231,
              <br />
              Puttalam Road,
              <br />
              Kurunegala,
              <br />
              Sri Lanka
            </p>
            <a href="tel:+94372224717" className={styles.phone}>
              +94 37 22 24 717
            </a>
            <br />
            <a href="mailto:honshu7@sltnet.lk" className={styles.phone}>
              honshu7@sltnet.lk
            </a>
            <br />
            <a href="mailto:honshu7@yahoo.com" className={styles.phone}>
              honshu7@yahoo.com
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            ©2026 Honshu Enterprises Co., Ltd. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>

      <div className={styles.watermark}>
        ALL RIGHTS RESERVED BY UPSITE. UNAUTHORIZED USE, REPRODUCTION, OR
        DISTRIBUTION OF THIS DESIGN WITHOUT PRIOR PERMISSION IS STRICTLY
        PROHIBITED AND MAY RESULT IN LEGAL ACTION.
      </div>
    </footer>
  );
};

export default Footer;
