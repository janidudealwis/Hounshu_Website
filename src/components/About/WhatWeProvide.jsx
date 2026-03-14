import React from "react";
import styles from "./WhatWeProvide.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const services = [
  {
    id: 1,
    title: "Strategic Planning",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    description:
      "Deep market analysis and roadmap development to ensure long-term sustainability and competitive edge.",
  },
  {
    id: 2,
    title: "Tech Integration",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2"
      >
        <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
        <line x1="12" y1="12" x2="20" y2="7.5" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <line x1="12" y1="12" x2="4" y2="7.5" />
      </svg>
    ),
    description:
      "Implementing cutting-edge AI and automation within traditional manufacturing and logistics workflows.",
  },
  {
    id: 3,
    title: "Human Capital",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    description:
      "Talent acquisition and management systems designed for the remote and hybrid workforce of today.",
  },
];

const WhatWeProvide = () => {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div ref={headerRef} className={`${styles.header} reveal`}>
          <h2 className={styles.title}>What We Provide</h2>
          <p className={styles.subtitle}>
            Comprehensive solutions tailored for the demands of modern
            infrastructure and enterprise growth.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`${styles.grid} reveal`}
          style={{ transitionDelay: "0.15s" }}
        >
          {services.map((service) => (
            <div key={service.id} className={styles.card}>
              <div className={styles.iconContainer}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeProvide;
