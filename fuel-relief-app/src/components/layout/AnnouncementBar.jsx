import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ANNOUNCEMENTS } from "../../data/announcements.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { STORAGE_KEYS } from "../../utils/storage.js";

const ROTATE_MS = 5500;

export default function AnnouncementBar() {
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useLocalStorage(
    STORAGE_KEYS.DISMISSED_ANNOUNCEMENTS,
    []
  );

  const visible = useMemo(
    () => ANNOUNCEMENTS.filter((a) => !dismissed.includes(a.id)),
    [dismissed]
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (visible.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % visible.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [visible.length]);

  useEffect(() => {
    if (index >= visible.length) setIndex(0);
  }, [visible.length, index]);

  if (visible.length === 0) return null;
  const current = visible[index];

  const dismissAll = () => setDismissed(ANNOUNCEMENTS.map((a) => a.id));

  return (
    <div className="bg-leaf-100 text-ink-900 dark:bg-leaf-700/40 dark:text-leaf-50 text-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-600 dark:bg-leaf-300" aria-hidden="true" />
        <div className="relative flex-1 overflow-hidden h-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 truncate"
            >
              {t(current.key)}
            </motion.p>
          </AnimatePresence>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />
        <button
          type="button"
          onClick={dismissAll}
          aria-label="Dismiss announcements"
          className="focus-ring shrink-0 rounded-full p-1 hover:bg-leaf-200/70 dark:hover:bg-leaf-700/60"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
