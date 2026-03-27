import React from "react";
import ScrollReveal from "./ScrollReveal";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.noise} />
      <div className={styles.glow} />

      <ScrollReveal direction="fade" delay={0.2}>
        <div className={styles.container}>
          <ScrollReveal direction="scale" delay={0.4}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              INDUSTRIAL MASTERY
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.6}>
            <h1 className={styles.heading}>
              Japanese
              <br />
              <span style={{ whiteSpace: "nowrap" }}>
                Industrial <span className={styles.green}>Excellence</span>
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.8}>
            <p className={styles.subtext}>
              Precision engineering and heavy-duty reliability for the
              <br />
              global industrial landscape. Built for those who build the future.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={1.0}>
            <div className={styles.buttons}>
              <button className={styles.primaryBtn}>
                Explore Inventory&nbsp; →
              </button>
              <button className={styles.secondaryBtn}>Request Quote</button>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
