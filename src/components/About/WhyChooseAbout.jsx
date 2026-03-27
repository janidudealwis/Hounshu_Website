import React from "react";
import ScrollReveal from "../ScrollReveal";
import styles from "./WhyChooseAbout.module.css";
import useCounterAnimation from "../../hooks/useCounterAnimation";

const StatItem = ({ number, label, suffix, delay = 0 }) => {
  const [count, ref] = useCounterAnimation(number, 2000);

  return (
    <ScrollReveal direction="up" delay={delay}>
      <div className={styles.stat} ref={ref}>
        <span className={styles.number}>
          {count}{suffix}
        </span>
        <span className={styles.label}>{label}</span>
      </div>
    </ScrollReveal>
  );
};

const WhyChooseAbout = () => {
  return (
    <ScrollReveal direction="up" delay={0.2}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <ScrollReveal direction="left" delay={0.4}>
              <div className={styles.content}>
                <ScrollReveal direction="up" delay={0.6}>
                  <h2 className={styles.title}>Why Choose Us?</h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.8}>
                  <p className={styles.description}>
                    We combine decades of institutional knowledge with an agile
                    startup mindset. Our clients don't just get a service provider;
                    they get a strategic partner committed to their growth.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={1.0}>
                  <ul className={styles.list}>
                    {[
                      "Industry-leading security protocols",
                      "24/7 dedicated support team",
                      "Sustainable and ethical business practices",
                    ].map((item, index) => (
                      <ScrollReveal
                        key={index}
                        direction="right"
                        delay={1.2 + (index * 0.2)}
                      >
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
                          {item}
                        </li>
                      </ScrollReveal>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <div className={styles.stats}>
                <StatItem number={98} label="Client Retention" suffix="%" delay={1.8} />
                <StatItem number={15} label="Global Awards" suffix="+" delay={2.0} />
                <StatItem number={500} label="Project Hours" suffix="k" delay={2.2} />
                <StatItem number={24} label="Operations" suffix="/7" delay={2.4} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default WhyChooseAbout;
