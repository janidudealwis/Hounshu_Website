import React from "react";
import styles from "./EquipmentCategories.module.css";
import useScrollReveal from "../hooks/useScrollReveal";

const categories = [
  {
    id: 1,
    title: "Industrial Generators",
    desc: "Reliable power in any environment.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Heavy Forklifts",
    desc: "Precision lifting for massive loads.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 17V6a2 2 0 0 1 2-2h12l2 4v7" />
        <path d="M8 17H4" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
        <path d="M14 6v5h6" />
      </svg>
    ),
    img: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Excavation",
    desc: "Earth-moving power with smart controls.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 20h20" />
        <path d="M6 20V10l4-6h4l2 6-4 1v9" />
        <path d="M10 4v4" />
        <path d="M16 10l3 3-5 2" />
      </svg>
    ),
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Power Systems",
    desc: "Integrated energy solutions for industry.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80&auto=format&fit=crop",
  },
];

const EquipmentCategories = () => {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.08 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div ref={headerRef} className={`${styles.header} reveal`}>
          <div>
            <h2 className={styles.title}>Equipment Categories</h2>
            <p className={styles.subtitle}>
              High-performance machinery for diverse industrial needs
            </p>
          </div>
          <a href="#" className={styles.viewAll}>
            View All Categories &nbsp;→
          </a>
        </div>

        <div
          ref={gridRef}
          className={`${styles.grid} reveal`}
          style={{ transitionDelay: "0.15s" }}
        >
          {categories.map((cat) => (
            <div key={cat.id} className={styles.card}>
              <img
                src={cat.img}
                alt={cat.title}
                className={styles.cardImg}
                loading="lazy"
              />
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <span className={styles.cardIcon}>{cat.icon}</span>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDesc}>{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentCategories;
