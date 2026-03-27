import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Enhanced scroll reveal hook using framer-motion for robust animations
 * @param {Object} options - Configuration options
 * @returns {Array} [ref, isInView] - Ref for the element and visibility state
 */
const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    once = true,
    margin = "0px 0px -50px 0px",
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    once,
    margin,
  });

  return [ref, isInView];
};

/**
 * Hook for creating staggered reveal animations
 * @param {Object} options - Configuration options
 * @returns {Array} [ref, isInView, getItemDelay] - Ref, visibility state, and delay function
 */
export const useStaggeredReveal = (options = {}) => {
  const {
    threshold = 0.1,
    once = true,
    margin = "0px 0px -50px 0px",
    staggerDelay = 0.1,
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    once,
    margin,
  });

  const getItemDelay = (index) => index * staggerDelay;

  return [ref, isInView, getItemDelay];
};
export default useScrollReveal;
