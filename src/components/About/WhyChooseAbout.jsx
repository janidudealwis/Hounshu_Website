import React from "react";
import styles from "./WhyChooseAbout.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const WhyChooseAbout = () => {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div ref={leftRef} className={`${styles.content} reveal-left`}>
            <h2 className={styles.title}>Why Choose Us?</h2>
            <p className={styles.description}>
              We combine decades of institutional knowledge with an agile
              startup mindset. Our clients don't just get a service provider;
              they get a strategic partner committed to their growth.
            </p>

            <ul className={styles.list}>
              <li>
                <span className={styles.checkIcon}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Industry-leading security protocols
              </li>
              <li>
                <span className={styles.checkIcon}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                24/7 dedicated support team
              </li>
              <li>
                <span className={styles.checkIcon}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Sustainable and ethical business practices
              </li>
            </ul>
          </div>

          <div ref={rightRef} className={`${styles.stats} reveal-right`}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Client Retention</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Global Awards</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>500k</div>
              <div className={styles.statLabel}>Project Hours</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Operations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAbout;
