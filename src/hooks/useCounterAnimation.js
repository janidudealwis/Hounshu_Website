import { useEffect, useRef, useState } from "react";

export default function useCounterAnimation(finalValue, duration = 1000) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let rafId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericValue = parseInt(finalValue.toString().replace(/[^0-9]/g, ""));
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(numericValue * easeProgress));
            if (progress < 1) {
              rafId = requestAnimationFrame(animate);
            }
          };

          rafId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [finalValue, duration]);

  return [displayValue, ref];
}
