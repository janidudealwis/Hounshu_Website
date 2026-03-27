import React from "react";
import ScrollReveal from "../ScrollReveal";
import styles from "./AboutHero.module.css";

const AboutHero = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal direction="left" delay={0.2}>
          <div className={styles.content}>
            <ScrollReveal direction="up" delay={0.4}>
              <p className={styles.journey}>OUR JOURNEY</p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <h1 className={styles.title}>
                Innovation
                <br />
                Through
                <br />
                <span className={styles.highlight}>Legacy &</span>
                <br />
                <span className={styles.highlight}>Vision.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.8}>
              <p className={styles.description}>
                Bridging the gap between traditional industry excellence
                <br />
                and the digital future of global enterprise.
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.4}>
          <div className={styles.imageContainer}>
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop"
              alt="Modern building"
              className={styles.image}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutHero;
