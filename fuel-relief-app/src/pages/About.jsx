import { useTranslation } from "react-i18next";
import PageHeader from "../components/common/PageHeader.jsx";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-2xl px-4 pb-20">
      <PageHeader title={t("footer.aboutPlatform")} />
      <div className="space-y-4 text-sm leading-relaxed text-ink-900/80 dark:text-sand-100/80">
        <p>{t("footer.disclaimerLong")}</p>
        <p>{t("footer.madeFor")}</p>
      </div>
    </div>
  );
}
