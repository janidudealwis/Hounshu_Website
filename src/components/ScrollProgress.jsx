import React, { useEffect, useState } from "react";
import styles from "./ScrollProgress.module.css";
import { useLenis } from "../context/LenisContext";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const onScroll = ({ progress }) => setProgress(progress * 100);
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  return (
    <div className={styles.track}>
      <div className={styles.bar} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ScrollProgress;
