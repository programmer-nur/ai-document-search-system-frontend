/**
 * Authentication utility functions
 * Handles token storage and retrieval from cookies
 */

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }

  // Set cookie with 7 days expiration
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  document.cookie = `authToken=${token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax; Secure`;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  return token || null;
}

export function removeAuthToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  document.cookie =
    "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

