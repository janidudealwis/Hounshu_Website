import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import { LenisProvider } from "../context/LenisContext";
import AboutHero from "../components/About/AboutHero";
import OurLegacy from "../components/About/OurLegacy";
import WhatWeProvide from "../components/About/WhatWeProvide";
import WhyChooseAbout from "../components/About/WhyChooseAbout";
import styles from "./About.module.css";

function About() {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <LenisProvider>
      <ScrollProgress />
      <main className={styles.pageWrapper}>
        <div className={styles.glowTop}></div>
        <div className={styles.glowMiddle}></div>
        <div className={styles.glowBottom}></div>

        <Navbar />
        <div className={styles.content}>
          <AboutHero />
          <OurLegacy />
          <WhatWeProvide />
          <WhyChooseAbout />
        </div>
        <Footer />
      </main>
    </LenisProvider>
  );
}

export default About;
