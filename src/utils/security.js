export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const cleaned = phone.replace(/[^\d+]/g, "");
  const digitCount = cleaned.replace(/\+/g, "").length;
  return digitCount >= 10 && digitCount <= 15;
};

export const isValidLength = (str, minLength = 1, maxLength = 1000) => {
  if (typeof str !== "string") return false;
  const trimmed = str.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
};

export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024,
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  } = options;

  const errors = [];

  if (!file) {
    errors.push("No file selected");
    return { valid: false, errors };
  }

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / 1024 / 1024}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(", ")}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];

    const recentAttempts = userAttempts.filter(
      (timestamp) => now - timestamp < this.windowMs,
    );

    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    return true;
  }

  reset(identifier) {
    this.attempts.delete(identifier);
  }

  getRemainingTime(identifier) {
    const userAttempts = this.attempts.get(identifier) || [];
    if (userAttempts.length === 0) return 0;

    const oldestAttempt = Math.min(...userAttempts);
    const resetTime = oldestAttempt + this.windowMs;
    const remaining = resetTime - Date.now();

    return Math.max(0, remaining);
  }
}
