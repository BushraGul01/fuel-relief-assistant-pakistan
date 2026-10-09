import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Mic, ShieldCheck, Sparkles } from "lucide-react";
import HelpCard from "../components/common/HelpCard.jsx";
import FAQAccordion from "../components/common/FAQAccordion.jsx";
import { HELP_CARDS } from "../data/helpCards.js";
import { FAQ_IDS } from "../data/faqs.js";

export default function Home() {
  const { t } = useTranslation();
  const location = useLocation();

  // Direct links / refreshes with #help-center (e.g. from the navbar on
  // another page) should land on the help center section, not the top.
  useEffect(() => {
    if (location.hash === "#help-center") {
      const id = requestAnimationFrame(() => {
        document.getElementById("help-center")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [location.hash]);

  const faqItems = FAQ_IDS.slice(0, 4).map((id) => ({
    id,
    question: t(`faq.items.${id}.q`),
    answer: t(`faq.items.${id}.a`),
  }));

  return (
    <div>
      {/* Hero */}
      <section className="bg-ink-900 text-sand-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-sm font-medium tracking-wide text-leaf-300">
              {t("hero.eyebrow")}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {t("hero.titlePrefix")}{" "}
              <span className="text-leaf-300">{t("hero.titleHighlight")}</span>{" "}
              {t("hero.titleSuffix")}
            </h1>
            <p className="mt-5 max-w-md text-base text-sand-100/80">{t("hero.subtitle")}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="rounded-xl border border-leaf-400/30 bg-leaf-700/30 px-4 py-3">
                <p className="text-sm font-semibold text-leaf-100">
                  {t("common.urduSupportAvailable")}
                </p>
                <p dir="rtl" className="font-urdu text-sm text-leaf-200/90">
                  {t("common.urduSupportNote")}
                </p>
              </div>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-sand-100/70">
              <ShieldCheck className="h-4 w-4 text-leaf-300" />
              {t("hero.badgeTrust")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl2 border border-white/10 bg-leaf-700/20 p-6 sm:p-8"
          >
            <span className="absolute right-6 top-6 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sand-100/80">
              {t("hero.panelKicker")}
            </span>
            <div className="mt-10 flex flex-col gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-400 text-ink-900">
                <Sparkles className="h-7 w-7" />
              </div>
              <p className="font-display text-xl font-semibold">{t("hero.panelLine1")}</p>
              <p className="text-sm text-sand-100/75">{t("hero.panelLine2")}</p>
              <Link
                to="/assistant"
                className="focus-ring mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-leaf-400 px-5 py-2.5 text-sm font-semibold text-ink-900 transition hover:bg-leaf-300"
              >
                <Mic className="h-4 w-4" />
                {t("cards.assistant.title")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help center */}
      <section id="help-center" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-leaf-700 dark:text-leaf-300">
              {t("home.helpCenterEyebrow")}
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-sand-50 sm:text-3xl">
              {t("home.helpCenterTitle")}
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-900/60 dark:text-sand-100/60">
            {t("home.helpCenterSubtitle")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HELP_CARDS.map((card, i) => (
            <HelpCard
              key={card.id}
              icon={card.icon}
              tone={card.tone}
              to={card.to}
              index={i}
              title={t(card.titleKey)}
              description={t(card.descKey)}
            />
          ))}
        </div>
      </section>

      {/* Good to know / FAQ preview */}
      <section className="bg-sand-100 dark:bg-ink-900">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
          <p className="text-sm font-medium text-leaf-700 dark:text-leaf-300">
            {t("home.goodToKnowEyebrow")}
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-sand-50 sm:text-3xl">
            {t("home.goodToKnowTitle")}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-ink-900/60 dark:text-sand-100/60">
            {t("home.goodToKnowSubtitle")}
          </p>

          <div className="mt-8 rounded-xl2 border border-ink-900/10 bg-white p-2 dark:border-sand-100/10 dark:bg-ink-950">
            <div className="px-4">
              <FAQAccordion items={faqItems} />
            </div>
          </div>

          <Link
            to="/faq"
            className="focus-ring mt-6 inline-flex items-center gap-1 text-sm font-semibold text-leaf-700 hover:underline dark:text-leaf-300"
          >
            {t("home.seeAllFaqs")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
