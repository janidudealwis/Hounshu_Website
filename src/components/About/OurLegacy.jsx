import React from "react";
import styles from "./OurLegacy.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const OurLegacy = () => {
  const imageRef = useScrollReveal();
  const contentRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div ref={imageRef} className={`${styles.images} reveal-left`}>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80&auto=format&fit=crop"
            alt="Conference room"
            className={styles.img1}
          />
          <img
            src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80&auto=format&fit=crop"
            alt="Office setup"
            className={styles.img2}
          />
        </div>

        <div ref={contentRef} className={`${styles.content} reveal-right`}>
          <h2 className={styles.title}>Our Legacy</h2>
          <div className={styles.descCard}>
            <p className={styles.description}>
              Founded on the principles of integrity and relentless progress,
              Honshu Enterprises has spent five decades redefining what's
              possible in the global marketplace. We started as a small boutique
              consultancy and evolved into a multi-sector powerhouse.
            </p>
          </div>

          <div className={styles.milestones}>
            <div className={styles.milestone}>
              <div className={styles.icon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <div>
                <h3 className={styles.milestoneTitle}>Founded in 1974</h3>
                <p className={styles.milestoneDesc}>
                  Established with a vision for industrial modernization.
                </p>
              </div>
            </div>

            <div className={styles.milestone}>
              <div className={styles.icon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h3 className={styles.milestoneTitle}>Global Expansion</h3>
                <p className={styles.milestoneDesc}>
                  Currently operating in 14 countries with over 5,000 employees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLegacy;
