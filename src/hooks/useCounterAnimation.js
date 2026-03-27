import { useEffect, useRef, useState } from "react";

/**
 * Hook to animate numbers from 0 to final value
 * Triggers when element enters viewport (Intersection Observer)
 * Runs only once
 * @param {number} finalValue - The final numeric value
 * @param {number} duration - Animation duration in ms (default: 1000)
 * @returns {[number, React.RefObject]} - [animated value, ref for element]
 */
export default function useCounterAnimation(finalValue, duration = 1000) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when element enters viewport
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Parse the final value (remove +, %, k, etc. for calculation)
          const numericValue = parseInt(finalValue.toString().replace(/[^0-9]/g, ""));

          // Animation timing
          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1); // 0 to 1

            // Easing function for smooth animation (ease-out)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            // Calculate current value
            const currentValue = Math.floor(
              startValue + (numericValue - startValue) * easeProgress
            );

            setDisplayValue(currentValue);

            // Continue animation if not complete
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          // Start animation
          animate();

          // Cleanup observer after animation completes
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [finalValue, duration]);

  return [displayValue, ref];
}
