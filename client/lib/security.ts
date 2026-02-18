// Security utilities for the Jucrisc application

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";

  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Brazilian format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
  if (!phoneRegex.test(phone)) return false;

  // Reject sequences of repeated digits (like 11111111111)
  const digits = phone.replace(/\D/g, "");
  const hasRepeatedDigits = /^(\d)\1{9,}$/.test(digits);
  if (hasRepeatedDigits) return false;

  // Reject patterns like 12345678 or similar sequences
  const hasSequentialPattern = /^(\d)(\d)(?:\1{2,}|\2{2,})/.test(digits);
  if (hasSequentialPattern) return false;

  return true;
}

/**
 * Validate if name has at least first and last name
 */
export function isValidFullName(name: string): boolean {
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  return parts.length >= 2 && parts.every((part) => part.length >= 2);
}

/**
 * Check if a date is older than X days
 */
export function isOlderThanDays(dateStr: string, days: number): boolean {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > days;
  } catch {
    return false;
  }
}

/**
 * Get current year dynamically
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Get current month dynamically
 */
export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}

/**
 * Get current day dynamically
 */
export function getCurrentDay(): number {
  return new Date().getDate();
}

/**
 * Format year for display (e.g., "2026")
 */
export function getYearDisplay(): string {
  return getCurrentYear().toString();
}

/**
 * Get relative date label in Portuguese (e.g., "Hoje", "Ontem", "2 dias atrás")
 */
export function getRelativeDateLabel(daysAgo: number): string {
  if (daysAgo === 0) return "Hoje";
  if (daysAgo === 1) return "Ontem";
  return `${daysAgo} dias atrás`;
}

/**
 * Generate a safe slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Remove multiple hyphens
    .trim();
}

/**
 * Check if user or admin is authenticated
 */
export function isUserAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  const userSession = localStorage.getItem("user_session");
  const adminToken = localStorage.getItem("admin_token");
  const adminProfile = localStorage.getItem("admin_profile");
  const adminAuth = localStorage.getItem("admin_auth");

  return !!(userSession || (adminToken && adminProfile) || adminAuth);
}

/**
 * Get authenticated user/admin info
 */
export function getUserInfo(): {
  name: string;
  email: string;
  isAdmin: boolean;
} | null {
  if (typeof window === "undefined") return null;

  const session = localStorage.getItem("user_session");
  if (session) {
    try {
      const parsed = JSON.parse(session);
      return {
        name: parsed.name,
        email: parsed.email,
        isAdmin: false,
      };
    } catch {
      /* ignore */
    }
  }

  const adminProfile = localStorage.getItem("admin_profile");
  const adminToken = localStorage.getItem("admin_token");
  if (adminToken && adminProfile) {
    try {
      const parsed = JSON.parse(adminProfile);
      return {
        name: parsed.name,
        email: parsed.email,
        isAdmin: true,
      };
    } catch {
      /* ignore */
    }
  }

  const adminAuth = localStorage.getItem("admin_auth");
  if (adminAuth) {
    try {
      const parsed = JSON.parse(adminAuth);
      return {
        name: parsed.name || "Admin",
        email: parsed.email || "",
        isAdmin: true,
      };
    } catch {
      /* ignore */
    }
  }

  return null;
}

/**
 * Validate password strength
 */
export function isStrongPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) && // Has uppercase
    /[a-z]/.test(password) && // Has lowercase
    /[0-9]/.test(password) && // Has number
    /[!@#$%^&*]/.test(password) // Has special char
  );
}

/**
 * Rate limiting check (client-side)
 */
const requestCache = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  maxRequests: number = 5,
  windowMs: number = 60000,
): boolean {
  const now = Date.now();
  const requests = requestCache.get(key) || [];

  // Remove old requests outside the window
  const recentRequests = requests.filter((time) => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  recentRequests.push(now);
  requestCache.set(key, recentRequests);
  return true; // Request allowed
}

/**
 * Encrypt/hash email for analytics (one-way hash)
 */
export function hashEmail(email: string): string {
  let hash = 0;
  const str = email.toLowerCase();

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(16);
}
