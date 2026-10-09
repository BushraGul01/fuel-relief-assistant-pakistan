/**
 * storage.js
 * A single, swappable persistence layer. Every read/write in the app goes
 * through these four functions. Today they wrap localStorage; later, each
 * one can become a fetch() call to a real backend without touching the
 * components or hooks that call them.
 */

const PREFIX = "fra:"; // fuel relief assistant namespace, avoids clashes

function keyFor(key) {
  return key.startsWith(PREFIX) ? key : `${PREFIX}${key}`;
}

/** Read and JSON-parse a value. Returns fallback if missing or on any error. */
export function getItem(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(keyFor(key));
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/** JSON-stringify and store a value. Fails silently (e.g. storage disabled/full). */
export function setItem(key, value) {
  try {
    window.localStorage.setItem(keyFor(key), JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** Remove a single key. */
export function removeItem(key) {
  try {
    window.localStorage.removeItem(keyFor(key));
    return true;
  } catch {
    return false;
  }
}

/** Remove every key this app owns (keeps the namespace isolated from other sites' data). */
export function clearItem() {
  try {
    const toRemove = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(PREFIX)) toRemove.push(k);
    }
    toRemove.forEach((k) => window.localStorage.removeItem(k));
    return true;
  } catch {
    return false;
  }
}

// ---- Known storage keys (centralised so typos can't create silent bugs) ----
export const STORAGE_KEYS = {
  LANGUAGE: "language",
  THEME: "theme",
  CHAT_HISTORY: "chatHistory",
  ELIGIBILITY_HISTORY: "eligibilityHistory",
  VALIDATION_HISTORY: "validationHistory",
  USER_PREFERENCES: "userPreferences",
  DISMISSED_ANNOUNCEMENTS: "dismissedAnnouncements",
  RECENTLY_VIEWED_GUIDES: "recentlyViewedGuides",
  FAQ_RECENT_SEARCHES: "faqRecentSearches",
};
