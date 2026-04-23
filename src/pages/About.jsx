import React from "react"; // eslint-disable-line no-unused-vars
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import { LenisProvider } from "../context/LenisContext";
import AboutHero from "../components/About/AboutHero";
import OurLegacy from "../components/About/OurLegacy";
import WhatWeProvide from "../components/About/WhatWeProvide";
import WhyChooseAbout from "../components/About/WhyChooseAbout";
import styles from "./About.module.css";
import SEO from "../components/SEO";
import useScrollToTop from "../hooks/useScrollToTop";

function About() {
  useScrollToTop();

  return (
    <LenisProvider>
      <SEO
        title="About Us"
        description="Learn about Honshu Enterprises — Sri Lanka's leading importer and supplier of Japanese industrial equipment. Our legacy of reliability, precision and service spans decades."
        canonical="/about"
      />
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
