import React from "react";
import ScrollReveal from "../ScrollReveal";
import styles from "./AboutHero.module.css";
import AboutImage from "../../../AboutImage.png";

const stats = [
  { value: "50+", label: "Years of Experience" },
  { value: "500+", label: "Products Delivered" },
  { value: "150+", label: "Corporate Clients" },
  { value: "100%", label: "Japanese Quality" },
];

const AboutHero = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Left: Text ── */}
        <div className={styles.content}>
          <ScrollReveal direction="up" delay={0.2}>
            <div className={styles.eyebrow}>
              <span className={styles.dot} />
              About Honshu Enterprises
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.35}>
            <h1 className={styles.title}>
              Built on Trust,<br />
              Driven by <span className={styles.highlight}>Japanese</span><br />
              <span className={styles.highlight}>Excellence.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <p className={styles.description}>
              Honshu Enterprises is Sri Lanka's foremost supplier of Japanese industrial
              machinery. From heavy-duty generators to precision excavation equipment,
              we bring world-class technology to the industries that build our nation.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.65}>
            <div className={styles.divider} />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.75}>
            <div className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ── Right: Image ── */}
        <ScrollReveal direction="right" delay={0.3}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageFrame}>
              <img
                src={AboutImage}
                alt="Honshu Enterprises industrial equipment"
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeYear}>EST.</span>
              <span className={styles.badgeNum}>1974</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default AboutHero;
