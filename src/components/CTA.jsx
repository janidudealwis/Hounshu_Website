import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import styles from "./CTA.module.css";

const CTA = () => {
  const [email, setEmail] = useState("");

  return (
    <section className={styles.section}>
      <ScrollReveal direction="up" delay={0.2}>
        <div className={styles.container}>
          <ScrollReveal direction="scale" delay={0.4}>
            <div className={styles.card}>
              <div className={styles.glow} />
              <div className={styles.content}>
                <ScrollReveal direction="up" delay={0.6}>
                  <h2 className={styles.title}>Ready to Upgrade Your Operations?</h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.8}>
                  <p className={styles.desc}>
                    Join thousands of global companies that trust Honshu for their
                    most demanding projects.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={1.0}>
                  <div className={styles.form}>
                    <input
                      type="email"
                      placeholder="Enter your business email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                    />
                    <button className={styles.btn}>Get Started</button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CTA;
