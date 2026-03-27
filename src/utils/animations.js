// Animation utilities for scroll reveal effects
export const animationVariants = {
  // Fade up animation
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },

  // Fade down animation
  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },

  // Slide from left
  slideLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  },

  // Slide from right
  slideRight: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  },

  // Scale up animation
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },

  // Fade only
  fadeOnly: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },

  // Flip animation
  flipUp: {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { opacity: 1, rotateX: 0 },
  },

  // Staggered children container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  // Staggered child items
  staggerChild: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
};

// Transition presets
export const transitionPresets = {
  smooth: {
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1],
  },

  snappy: {
    duration: 0.35,
    ease: [0.4, 0, 0.2, 1],
  },

  bouncy: {
    duration: 0.6,
    ease: [0.68, -0.55, 0.265, 1.55],
  },

  slow: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

// Animation delays for creating staggered effects
export const createStaggerDelay = (index, baseDelay = 0.1) => {
  return index * baseDelay;
};