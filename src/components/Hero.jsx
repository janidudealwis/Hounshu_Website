import React from "react";
import styles from "./Hero.module.css";
import useScrollReveal from "../hooks/useScrollReveal";

const Hero = () => {
  const ref = useScrollReveal();

  return (
    <section className={styles.hero}>
      <div className={styles.noise} />
      <div className={styles.glow} />
      <div ref={ref} className={`${styles.container} reveal`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          INDUSTRIAL MASTERY
        </div>

        <h1 className={styles.heading}>
          Japanese
          <br />
          <span style={{ whiteSpace: "nowrap" }}>
            Industrial <span className={styles.green}>Excellence</span>
          </span>
        </h1>

        <p className={styles.subtext}>
          Precision engineering and heavy-duty reliability for the
          <br />
          global industrial landscape. Built for those who build the future.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primaryBtn}>
            Explore Inventory&nbsp; →
          </button>
          <button className={styles.secondaryBtn}>Request Quote</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
