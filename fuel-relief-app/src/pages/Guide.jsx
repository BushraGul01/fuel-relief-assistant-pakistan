import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CalendarDays, X } from "lucide-react";
import PageHeader from "../components/common/PageHeader.jsx";
import GuideCard from "../components/common/GuideCard.jsx";
import { PROVINCES } from "../data/provinces.js";
import { useHistoryList } from "../hooks/useHistoryList.js";
import { STORAGE_KEYS } from "../utils/storage.js";

export default function Guide() {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState(null);
  const { items: recent, addItem } = useHistoryList(
    STORAGE_KEYS.RECENTLY_VIEWED_GUIDES,
    { limit: 5 }
  );

  const open = PROVINCES.find((p) => p.id === openId);

  const handleOpen = (province) => {
    setOpenId(province.id);
    addItem({ id: `guide-${province.id}`, provinceId: province.id, name: t(province.nameKey) });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20">
      <PageHeader
        icon={CalendarDays}
        title={t("guide.pageTitle")}
        subtitle={t("guide.pageSubtitle")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROVINCES.map((p, i) => (
          <GuideCard
            key={p.id}
            index={i}
            name={t(p.nameKey)}
            example={p.example}
            dateLocation={t(`guide.provinces.${p.id}.dateLocation`)}
            onOpen={() => handleOpen(p)}
          />
        ))}
      </div>

      <section className="mt-10">
        <h2 className="mb-3 font-display text-lg font-semibold text-ink-900 dark:text-sand-50">
          {t("guide.recentlyViewed")}
        </h2>
        {recent.length === 0 ? (
          <p className="text-sm text-ink-900/50 dark:text-sand-100/50">
            {t("guide.recentlyViewedEmpty")}
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {recent.map((r) => (
              <li
                key={r.id}
                className="rounded-full border border-ink-900/10 bg-white px-3 py-1.5 text-xs font-medium text-ink-900/70 dark:border-sand-100/10 dark:bg-ink-900 dark:text-sand-100/70"
              >
                {r.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/50 p-0 sm:items-center sm:p-4"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-soft dark:bg-ink-900 sm:rounded-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-sand-50">
                    {t(open.nameKey)}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-ink-900/50 dark:text-sand-100/50">
                    {open.example}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="focus-ring rounded-full p-1.5 hover:bg-sand-100 dark:hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-leaf-50 p-4 text-sm text-leaf-800 dark:bg-leaf-700/20 dark:text-leaf-100">
                {t(`guide.provinces.${open.id}.dateLocation`)}
              </div>

              <h4 className="mt-5 text-sm font-semibold text-ink-900 dark:text-sand-50">
                {t("guide.stepsTitle")}
              </h4>
              <ol className="mt-2 space-y-2">
                {t(`guide.provinces.${open.id}.steps`, { returnObjects: true }).map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-900/80 dark:text-sand-100/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-[11px] font-semibold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
