import React from "react";
import styles from "./WhyChoose.module.css";
import useScrollReveal from "../hooks/useScrollReveal";

const stats = [
  { value: "98%", label: "CLIENT RETENTION" },
  { value: "15+", label: "GLOBAL AWARDS" },
  { value: "500k", label: "PROJECT HOURS" },
  { value: "24/7", label: "OPERATIONS" },
];

const checks = [
  "Industry-leading security protocols",
  "24/7 dedicated support team",
  "Sustainable and ethical business practices",
];

const WhyChoose = () => {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal({ threshold: 0.08 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left */}
        <div ref={leftRef} className={`${styles.left} reveal-left`}>
          <h2 className={styles.title}>
            Why Choose
            <br />
            <span className={styles.green}>Honshu?</span>
          </h2>
          <p className={styles.desc}>
            We combine decades of institutional knowledge with an agile startup
            mindset. Our clients don't just get a service provider; they get a
            strategic partner committed to their growth.
          </p>
          <ul className={styles.checklist}>
            {checks.map((item) => (
              <li key={item} className={styles.checkItem}>
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
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div
          ref={rightRef}
          className={`${styles.grid} reveal-right`}
          style={{ transitionDelay: "0.1s" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
