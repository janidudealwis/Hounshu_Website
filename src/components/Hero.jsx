import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "../lib/supabase";
import styles from "./Hero.module.css";

const STATS = [
  { num: "500+", label: "Products" },
  { num: "20+",  label: "Years Exp." },
  { num: "#1",   label: "In Sri Lanka" },
];

const Hero = () => {
  const navigate = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data } = await supabase
          .from("products")
          .select("id, name, image, category, series, status")
          .order("created_at", { ascending: false })
          .limit(2);
        if (data) setLatestProducts(data);
      } catch (_) {}
    };
    fetchLatest();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.noise} />
      <div className={styles.glow} />

      <div className={styles.container}>

        {/* ── Left column ── */}
        <div className={styles.copy}>

          {/* Group 1 — identity */}
          <div className={styles.headerGroup}>
            <ScrollReveal direction="scale" delay={0.3}>
              <div className={styles.badge}>
                <span className={styles.badgeDot} />
                INDUSTRIAL MASTERY
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <h1 className={styles.heading}>
                Japanese<br />
                Industrial<br />
                <span className={styles.green}>Excellence</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Group 2 — subtext */}
          <ScrollReveal direction="up" delay={0.7}>
            <p className={styles.subtext}>
              Precision engineering and heavy-duty reliability for the global
              industrial landscape. Built for those who build the future.
            </p>
          </ScrollReveal>

          {/* Group 3 — actions */}
          <div className={styles.actionGroup}>
            <ScrollReveal direction="up" delay={0.85}>
              <div className={styles.buttons}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => navigate("/products")}
                >
                  Explore Inventory&nbsp;→
                </button>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => navigate("/contact")}
                >
                  Request Quote
                </button>
              </div>
            </ScrollReveal>

            
          </div>

        </div>

        {/* ── Column divider ── */}
        <div className={styles.columnDivider} />

        {/* ── Right column ── */}
        <div className={styles.productsPanel}>
          <ScrollReveal direction="fade" delay={0.4}>
            <div className={styles.panelHeader}>
              <span className={styles.panelLine} />
              <span className={styles.panelTitle}>Latest Arrivals</span>
              <span className={styles.panelLine} />
            </div>
          </ScrollReveal>

          <div className={styles.productCards}>
            {latestProducts.length > 0
              ? latestProducts.map((product, i) => (
                  <ScrollReveal key={product.id} direction="up" delay={0.6 + i * 0.15}>
                    <div
                      className={styles.productCard}
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      <div className={styles.cardHeader}>
                        <span className={styles.cardNumber}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`${styles.statusChip} ${
                            product.status === "IN STOCK"
                              ? styles.inStock
                              : styles.outOfStock
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>

                      <div className={styles.cardImgWrap}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.cardImg}
                          loading="lazy"
                        />
                      </div>

                      <div className={styles.cardBody}>
                        <span className={styles.cardSeries}>
                          {product.series || product.category}
                        </span>
                        <p className={styles.cardName}>{product.name}</p>
                        <span className={styles.cardLink}>View Product →</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))
              : [0, 1].map((i) => (
                  <div key={i} className={`${styles.productCard} ${styles.skeleton}`}>
                    <div className={styles.cardHeader}>
                      <span className={styles.skeletonPill} />
                      <span className={styles.skeletonPill} />
                    </div>
                    <div className={styles.skeletonImg} />
                    <div className={styles.cardBody}>
                      <span className={styles.skeletonLine} style={{ width: "40%" }} />
                      <span className={styles.skeletonLine} style={{ width: "72%" }} />
                    </div>
                  </div>
                ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
