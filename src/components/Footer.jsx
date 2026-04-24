import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import styles from "./Footer.module.css";

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
  return (
    <footer className={styles.footer}>
      <ScrollReveal direction="up" delay={0.2} threshold={0.05}>
        <div className={styles.container}>
          <div className={styles.top}>
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
              {/* Facebook */}
              <a href="https://www.facebook.com/search/top?q=honshu%20enterprises" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.social}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/he_coltd/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.social}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/817017488956" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.social}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
              {/* Line */}
              <a href="https://line.me/ti/p/+817085071077" target="_blank" rel="noopener noreferrer" aria-label="Line" className={styles.social}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
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

          {/* Japan Office */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Japan Office</h4>
            <p className={styles.address}>
              〒672-8079, Hyogo Prefecture,
              <br />
              Himeji City, Shikama Ward,
              <br />
              Imazaike 1405-1
              <br />
              Casa Nishishikama 203, JAPAN
              <br />
              220-10 Daijuji, Kamioka-cho,
              <br />
              Tatsuno City
            </p>
            <div className={styles.contactLinks}>
              <a href="tel:+81792807650" className={styles.phone}>Tel: +81 79 280 7650</a>
              <a href="tel:+81792807651" className={styles.phone}>Fax: +81 79 280 7651</a>
              <a href="tel:+81708507-1077" className={styles.phone}>Hotline: +81 70-8507-1077</a>
              <a href="mailto:honshuenterprisescoltd@gmail.com" className={styles.phone}>honshuenterprisescoltd@gmail.com</a>
            </div>
          </div>

          {/* Sri Lanka Office */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Sri Lanka Office</h4>
            <p className={styles.address}>
              No. 215, 231,
              <br />
              Puttalam Road,
              <br />
              Kurunegala, Sri Lanka
            </p>
            <div className={styles.contactLinks}>
              <a href="tel:+94372224717" className={styles.phone}>+94 37 22 24 717</a>
              <a href="tel:+94372225314" className={styles.phone}>Fax: +94 37 22 25 314</a>
              <a href="mailto:honshu7@sltnet.lk" className={styles.phone}>honshu7@sltnet.lk</a>
              <a href="mailto:honshu7@yahoo.com" className={styles.phone}>honshu7@yahoo.com</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            ©2026 Honshu Enterprises Co., Ltd. All rights reserved.
          </p>
          <p className={styles.designedBy}>
            Designed and Developed by{" "}
            <a
              href="https://updayte.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/logo-pill.png"
                alt="Updayte"
                style={{
                  height: "20px",
                  width: "auto",
                  display: "inline",
                  verticalAlign: "middle",
                  marginLeft: "4px",
                }}
              />
            </a>
          </p>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookies</a>
            <Link to="/admin/login">Admin</Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </footer>
);
};

export default Footer;
