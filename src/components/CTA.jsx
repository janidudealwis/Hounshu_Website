import React, { useState } from "react";
import styles from "./CTA.module.css";
import useScrollReveal from "../hooks/useScrollReveal";

const CTA = () => {
  const [email, setEmail] = useState("");
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className={`${styles.section} reveal`}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.glow} />
          <div className={styles.content}>
            <h2 className={styles.title}>Ready to Upgrade Your Operations?</h2>
            <p className={styles.desc}>
              Join thousands of global companies that trust Honshu for their
              most demanding projects.
            </p>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
