import React from "react";
import ScrollReveal from "./ScrollReveal";
import styles from "./WhyChoose.module.css";
import useCounterAnimation from "../hooks/useCounterAnimation";

const stats = [
  { value: "98%", label: "CLIENT RETENTION", numeric: 98, suffix: "%" },
  { value: "15+", label: "GLOBAL AWARDS", numeric: 15, suffix: "+" },
  { value: "500k", label: "PROJECT HOURS", numeric: 500, suffix: "k" },
  { value: "24/7", label: "OPERATIONS", numeric: 24, suffix: "/7" },
];

const checks = [
  "Industry-leading security protocols",
  "24/7 dedicated support team",
  "Sustainable and ethical business practices",
];

const StatCard = ({ stat }) => {
  const [animatedValue, ref] = useCounterAnimation(stat.numeric, 1200);

  return (
    <div ref={ref} className={styles.statCard}>
      <h3 className={styles.statValue}>
        {animatedValue}
        {stat.suffix}
      </h3>
      <p className={styles.statLabel}>{stat.label}</p>
    </div>
  );
};

const WhyChoose = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left */}
        <ScrollReveal direction="left" delay={0.2}>
          <div className={styles.left}>
            <ScrollReveal direction="up" delay={0.4}>
              <h2 className={styles.title}>
                Why Choose
                <br />
                <span className={styles.green}>Honshu?</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <p className={styles.desc}>
                We combine decades of institutional knowledge with an agile startup
                mindset. Our clients don't just get a service provider; they get a
                strategic partner committed to their growth.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.8}>
              <ul className={styles.checklist}>
                {checks.map((item, index) => (
                  <ScrollReveal key={item} direction="up" delay={1.0 + index * 0.1}>
                    <li className={styles.checkItem}>
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
                  </ScrollReveal>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        {/* Right */}
        <ScrollReveal direction="right" delay={0.4}>
          <div className={styles.grid}>
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={0.6 + index * 0.1}>
                <StatCard stat={stat} />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyChoose;