import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AlertTriangle, CheckCircle2, Mail, Phone } from "lucide-react";
import PageHeader from "../components/common/PageHeader.jsx";
import { CONTACT_INFO } from "../data/contactInfo.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export default function Contact() {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);
  const [savedFeedback, setSavedFeedback] = useLocalStorage("platformFeedback", []);

  const processSteps = t("contact.processSteps", { returnObjects: true });

  const submitFeedback = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSavedFeedback((prev) => [
      { id: Date.now(), message: feedback.trim(), timestamp: new Date().toISOString() },
      ...prev,
    ]);
    setFeedback("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20">
      <PageHeader title={t("contact.pageTitle")} subtitle={t("contact.pageSubtitle")} />

      <div className="rounded-xl2 border border-amber-100 bg-amber-100/50 p-4 text-sm text-amber-500 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
        <p className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 translate-y-0.5" />
          {t("footer.disclaimerLong")}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl2 border border-ink-900/10 bg-white p-5 dark:border-sand-100/10 dark:bg-ink-900">
          <p className="flex items-center gap-2 text-sm font-medium text-ink-900/60 dark:text-sand-100/60">
            <Phone className="h-4 w-4" />
            {t("contact.helplineLabel")}
          </p>
          <p className="mt-1 font-mono text-lg font-semibold text-ink-900 dark:text-sand-50">
            {CONTACT_INFO.helpline}
          </p>
        </div>
        <div className="rounded-xl2 border border-ink-900/10 bg-white p-5 dark:border-sand-100/10 dark:bg-ink-900">
          <p className="flex items-center gap-2 text-sm font-medium text-ink-900/60 dark:text-sand-100/60">
            <Mail className="h-4 w-4" />
            {t("contact.emailLabel")}
          </p>
          <p className="mt-1 break-words text-sm font-semibold text-ink-900 dark:text-sand-50">
            {CONTACT_INFO.email}
          </p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-sand-50">
          {t("contact.processTitle")}
        </h2>
        <ol className="mt-3 space-y-2">
          {processSteps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-ink-900/80 dark:text-sand-100/80">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 rounded-xl2 border border-ink-900/10 bg-sand-100 p-5 dark:border-sand-100/10 dark:bg-ink-900">
        <h2 className="font-display text-base font-semibold text-ink-900 dark:text-sand-50">
          {t("contact.escalationTitle")}
        </h2>
        <p className="mt-1.5 text-sm text-ink-900/70 dark:text-sand-100/70">
          {t("contact.escalationBody")}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-sand-50">
          {t("contact.feedbackTitle")}
        </h2>
        <p className="mt-1 text-sm text-ink-900/60 dark:text-sand-100/60">{t("contact.feedbackBody")}</p>
        <form onSubmit={submitFeedback} className="mt-3 space-y-3">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t("contact.feedbackPlaceholder")}
            rows={4}
            className="focus-ring w-full rounded-xl border border-ink-900/15 bg-white p-4 text-sm dark:border-sand-100/15 dark:bg-ink-900 dark:text-sand-50"
          />
          <button
            type="submit"
            className="focus-ring rounded-xl bg-leaf-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-leaf-700"
          >
            {t("contact.feedbackSubmit")}
          </button>
          {sent && (
            <p className="flex items-center gap-1.5 text-sm text-leaf-700 dark:text-leaf-300">
              <CheckCircle2 className="h-4 w-4" />
              {t("contact.feedbackThanks")}
            </p>
          )}
        </form>
        {savedFeedback.length > 0 && (
          <p className="mt-3 text-xs text-ink-900/40 dark:text-sand-100/40">
            {savedFeedback.length} saved on this device.
          </p>
        )}
      </section>
    </div>
  );
}
