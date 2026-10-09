import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

/**
 * A capped, newest-first list persisted to localStorage.
 * Used for validation history, eligibility history, chat history,
 * recently viewed guides, and FAQ recent searches.
 */
export function useHistoryList(key, { limit = 20 } = {}) {
  const [items, setItems] = useLocalStorage(key, []);

  const addItem = useCallback(
    (entry) => {
      const withMeta = {
        id: entry.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp: entry.timestamp || new Date().toISOString(),
        ...entry,
      };
      setItems((prev) => [withMeta, ...prev].slice(0, limit));
      return withMeta;
    },
    [setItems, limit]
  );

  const removeItem = useCallback(
    (id) => setItems((prev) => prev.filter((it) => it.id !== id)),
    [setItems]
  );

  const clear = useCallback(() => setItems([]), [setItems]);

  return { items, addItem, removeItem, clear };
}
