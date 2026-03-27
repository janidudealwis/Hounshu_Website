import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Exponential-out: fast start → graceful deceleration. Feels natural and snappy.
const EASE_EXPO = [0.16, 1, 0.3, 1];
// Smooth ease-out for opacity — slightly faster than transform so the element
// "arrives" visually before it fully settles, which reads as crisp.
const EASE_FADE = [0.4, 0, 0.2, 1];

const buildVariants = (direction, distance, duration, delay) => {
  const moveTx = { duration, delay, ease: EASE_EXPO };
  const fadeTx = { duration: duration * 0.6, delay, ease: EASE_FADE };

  const hidden = {
    up:    { opacity: 0, y: distance },
    down:  { opacity: 0, y: -distance },
    left:  { opacity: 0, x: -distance },
    right: { opacity: 0, x: distance },
    fade:  { opacity: 0 },
    scale: { opacity: 0, scale: 0.94 },
  };

  const visible = {
    up:    { opacity: 1, y: 0,      transition: { ...moveTx, opacity: fadeTx } },
    down:  { opacity: 1, y: 0,      transition: { ...moveTx, opacity: fadeTx } },
    left:  { opacity: 1, x: 0,      transition: { ...moveTx, opacity: fadeTx } },
    right: { opacity: 1, x: 0,      transition: { ...moveTx, opacity: fadeTx } },
    fade:  { opacity: 1,            transition: fadeTx },
    scale: { opacity: 1, scale: 1,  transition: { ...moveTx, opacity: fadeTx } },
  };

  return {
    hidden: hidden[direction] ?? hidden.fade,
    visible: visible[direction] ?? visible.fade,
  };
};

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.55,
  distance = 28,
  once = true,
  threshold = 0.1,
  className = "",
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    once,
    margin: "0px 0px -60px 0px",
  });

  const variants = buildVariants(direction, distance, duration, delay);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
