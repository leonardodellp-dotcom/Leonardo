// Security utilities for the Jucrisc application

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
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
  return phoneRegex.test(phone);
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
 * Generate a safe slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Remove multiple hyphens
    .trim();
}

/**
 * Check if user is authenticated (admin)
 */
export function isUserAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const auth = localStorage.getItem('admin_auth');
  return !!auth;
}

/**
 * Get authenticated admin info
 */
export function getAdminInfo(): { email: string; token: string } | null {
  if (typeof window === 'undefined') return null;
  
  const auth = localStorage.getItem('admin_auth');
  if (!auth) return null;
  
  try {
    return JSON.parse(auth);
  } catch {
    return null;
  }
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

export function checkRateLimit(key: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const requests = requestCache.get(key) || [];
  
  // Remove old requests outside the window
  const recentRequests = requests.filter(time => now - time < windowMs);
  
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
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16);
}
