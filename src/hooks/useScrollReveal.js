import { useEffect, useRef } from "react";

/**
 * Attaches an Intersection Observer to the returned ref.
 * When the element enters the viewport it gets the class `reveal-visible`,
 * triggering the CSS transition defined in index.css.
 *
 * @param {Object} options - IntersectionObserver options
 */
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.unobserve(el); // animate once
        }
      },
      { threshold: 0.12, ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};

export default useScrollReveal;
