import React from "react";
import ScrollReveal from "../ScrollReveal";
import styles from "./OurLegacy.module.css";

const milestones = [
  {
    year: "1974",
    title: "Founded",
    desc: "Established in Sri Lanka with a clear vision — to bring reliable Japanese industrial machinery to the nation's growing industries.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    year: "1990s",
    title: "Expanding Portfolio",
    desc: "Grew beyond generators into forklifts, excavators, and heavy civil equipment — becoming a one-stop supplier for the construction and industrial sectors.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    year: "2000s",
    title: "Nationwide Reach",
    desc: "Established supply chains across all provinces, serving infrastructure projects, manufacturing plants, and government contracts island-wide.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    year: "Today",
    title: "Industry Leader",
    desc: "With 50+ years of expertise, 150+ corporate clients, and a catalogue of 500+ products, Honshu Enterprises remains Sri Lanka's most trusted industrial equipment partner.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const OurLegacy = () => {
  return (
    <ScrollReveal direction="up" delay={0.2}>
      <section className={styles.section}>
        <div className={styles.container}>

          {/* ── Section Header ── */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className={styles.header}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                Our Story
              </div>
              <h2 className={styles.title}>A Legacy Built on<br /><span className={styles.highlight}>Reliability & Trust</span></h2>
              <p className={styles.subtitle}>
                For over five decades, Honshu Enterprises has been the bridge between
                Japanese industrial engineering and Sri Lanka's most demanding industries.
                From humble beginnings to national leadership, our journey is defined by
                an unwavering commitment to quality, service, and partnership.
              </p>
            </div>
          </ScrollReveal>

          {/* ── Timeline ── */}
          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} direction="up" delay={0.4 + i * 0.15}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineLeft}>
                    <span className={styles.year}>{m.year}</span>
                    <div className={styles.connector} />
                  </div>
                  <div className={styles.timelineCard}>
                    <div className={styles.cardIcon}>{m.icon}</div>
                    <div>
                      <h3 className={styles.milestoneTitle}>{m.title}</h3>
                      <p className={styles.milestoneDesc}>{m.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>
    </ScrollReveal>
  );
};

export default OurLegacy;
