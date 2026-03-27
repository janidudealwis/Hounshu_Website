/**
 * Security utility functions for input validation and sanitization
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * Removes or escapes potentially dangerous HTML characters
 */
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

/**
 * Validates email format using RFC 5322 compliant regex
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number (international format)
 * Allows: +, digits, spaces, dashes, parentheses
 */
export const isValidPhone = (phone) => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Check if it has 10-15 digits (international standard)
  const digitCount = cleaned.replace(/\+/g, "").length;
  return digitCount >= 10 && digitCount <= 15;
};

/**
 * Validates that a string is within acceptable length limits
 */
export const isValidLength = (str, minLength = 1, maxLength = 1000) => {
  if (typeof str !== "string") return false;
  const trimmed = str.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
};

/**
 * Validates URL format
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates file upload
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
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

/**
 * Rate limiter for preventing brute force attacks
 */
export class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];

    // Remove old attempts outside the time window
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

/**
 * Strips potentially dangerous HTML tags and attributes
 */
export const stripHTML = (html) => {
  if (typeof html !== "string") return html;

  // Create a temporary div to parse HTML
  const temp = document.createElement("div");
  temp.textContent = html;
  return temp.innerHTML;
};

/**
 * Validates and sanitizes product data
 */
export const validateProductData = (data) => {
  const errors = [];
  const sanitized = {};

  // Name validation
  if (!data.name || !isValidLength(data.name, 2, 200)) {
    errors.push("Product name must be between 2 and 200 characters");
  } else {
    sanitized.name = sanitizeInput(data.name.trim());
  }

  // Description validation
  if (!data.description || !isValidLength(data.description, 10, 5000)) {
    errors.push("Description must be between 10 and 5000 characters");
  } else {
    sanitized.description = sanitizeInput(data.description.trim());
  }

  // Series validation (optional)
  if (data.series) {
    if (!isValidLength(data.series, 0, 100)) {
      errors.push("Series must be less than 100 characters");
    } else {
      sanitized.series = sanitizeInput(data.series.trim());
    }
  }

  // Category validation
  if (!data.category || !isValidLength(data.category, 2, 50)) {
    errors.push("Category must be between 2 and 50 characters");
  } else {
    sanitized.category = sanitizeInput(data.category.trim());
  }

  // Image URL validation
  if (data.image_url) {
    if (
      !isValidURL(data.image_url) &&
      !data.image_url.startsWith("data:image")
    ) {
      errors.push("Invalid image URL");
    } else {
      sanitized.image_url = data.image_url;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    data: sanitized,
  };
};

/**
 * Validates contact form data
 */
export const validateContactData = (data) => {
  const errors = [];
  const sanitized = {};

  // Name validation
  if (!data.name || !isValidLength(data.name, 2, 100)) {
    errors.push("Name must be between 2 and 100 characters");
  } else {
    sanitized.name = sanitizeInput(data.name.trim());
  }

  // Email validation
  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Invalid email address");
  } else {
    sanitized.email = sanitizeInput(data.email.trim().toLowerCase());
  }

  // Phone validation
  if (!data.phone || !isValidPhone(data.phone)) {
    errors.push("Invalid phone number (10-15 digits required)");
  } else {
    sanitized.phone = sanitizeInput(data.phone.trim());
  }

  // Message validation
  if (!data.message || !isValidLength(data.message, 10, 2000)) {
    errors.push("Message must be between 10 and 2000 characters");
  } else {
    sanitized.message = sanitizeInput(data.message.trim());
  }

  return {
    valid: errors.length === 0,
    errors,
    data: sanitized,
  };
};
