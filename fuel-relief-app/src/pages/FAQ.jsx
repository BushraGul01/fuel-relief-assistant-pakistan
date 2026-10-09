import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";
import PageHeader from "../components/common/PageHeader.jsx";
import FAQAccordion from "../components/common/FAQAccordion.jsx";
import { FAQ_IDS } from "../data/faqs.js";
import { useHistoryList } from "../hooks/useHistoryList.js";
import { STORAGE_KEYS } from "../utils/storage.js";

export default function FAQPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const { items: recentSearches, addItem } = useHistoryList(
    STORAGE_KEYS.FAQ_RECENT_SEARCHES,
    { limit: 6 }
  );

  const allItems = useMemo(
    () =>
      FAQ_IDS.map((id) => ({
        id,
        question: t(`faq.items.${id}.q`),
        answer: t(`faq.items.${id}.a`),
      })),
    [t]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.trim().toLowerCase();
    return allItems.filter(
      (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  const commitSearch = () => {
    const q = query.trim();
    if (q.length > 1) addItem({ id: `${Date.now()}`, term: q });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20">
      <PageHeader title={t("faq.pageTitle")} subtitle={t("faq.pageSubtitle")} />

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/40 dark:text-sand-100/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={commitSearch}
          onKeyDown={(e) => e.key === "Enter" && commitSearch()}
          placeholder={t("faq.searchPlaceholder")}
          className="focus-ring w-full rounded-full border border-ink-900/15 bg-white py-3 pl-11 pr-10 text-sm dark:border-sand-100/15 dark:bg-ink-900 dark:text-sand-50"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={t("common.clear")}
            className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-900/40 hover:bg-sand-100 dark:text-sand-100/40 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {recentSearches.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-900/40 dark:text-sand-100/40">
            {t("faq.recentSearches")}:
          </span>
          {recentSearches.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setQuery(s.term)}
              className="focus-ring rounded-full bg-sand-100 px-3 py-1 text-xs text-ink-900/70 hover:bg-sand-200 dark:bg-ink-900 dark:text-sand-100/70"
            >
              {s.term}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 rounded-xl2 border border-ink-900/10 bg-white p-2 dark:border-sand-100/10 dark:bg-ink-900">
        {filtered.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-ink-900/50 dark:text-sand-100/50">
            {t("faq.noResults", { query })}
          </p>
        ) : (
          <div className="px-4">
            <FAQAccordion items={filtered} />
          </div>
        )}
      </div>
    </div>
  );
}
