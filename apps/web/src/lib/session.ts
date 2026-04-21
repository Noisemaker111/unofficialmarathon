/**
 * Session token management for local-first, no-auth architecture.
 *
 * A random UUID is generated on first visit and persisted in localStorage.
 * This token acts as a lightweight "identity" — attached to LFG posts so
 * the user can edit/delete their own posts without accounts.
 *
 * If localStorage is cleared, the user loses control of their previous posts.
 * That's the intended tradeoff: zero friction, zero accounts.
 */

const SESSION_TOKEN_KEY = "marathon-session-token";

/** Generate a v4 UUID without external dependencies. */
function generateUUID(): string {
  // crypto.randomUUID is available in all modern browsers and secure contexts
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback: RFC 4122 version 4 UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

/**
 * Get the current session token, creating one if it doesn't exist.
 * Safe to call at module scope — handles SSR by returning empty string.
 */
export function getSessionToken(): string {
  if (typeof window === "undefined") return "";

  let token = localStorage.getItem(SESSION_TOKEN_KEY);
  if (!token) {
    token = generateUUID();
    localStorage.setItem(SESSION_TOKEN_KEY, token);
  }
  return token;
}

/**
 * Reset the session token (generates a new one).
 * Useful for debugging. Not exposed in UI — clearing storage does this naturally.
 */
export function resetSessionToken(): string {
  if (typeof window === "undefined") return "";
  const newToken = generateUUID();
  localStorage.setItem(SESSION_TOKEN_KEY, newToken);
  return newToken;
}

/**
 * Check if a session token matches the current user's token.
 * Used to determine ownership of LFG posts for edit/delete.
 */
export function isSessionOwner(sessionToken: string | undefined): boolean {
  if (!sessionToken) return false;
  return sessionToken === getSessionToken();
}