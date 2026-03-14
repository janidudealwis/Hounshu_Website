import React from "react";
import styles from "./AboutHero.module.css";

const AboutHero = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.journey}>OUR JOURNEY</p>
          <h1 className={styles.title}>
            Innovation
            <br />
            Through
            <br />
            <span className={styles.highlight}>Legacy &</span>
            <br />
            <span className={styles.highlight}>Vision.</span>
          </h1>
          <p className={styles.description}>
            Bridging the gap between traditional industry excellence
            <br />
            and the digital future of global enterprise.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop"
            alt="Modern building"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
