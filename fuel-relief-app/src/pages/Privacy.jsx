import { useTranslation } from "react-i18next";
import PageHeader from "../components/common/PageHeader.jsx";

export default function Privacy() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-2xl px-4 pb-20">
      <PageHeader title={t("footer.privacyNotice")} />
      <div className="space-y-4 text-sm leading-relaxed text-ink-900/80 dark:text-sand-100/80">
        <p>
          Everything you enter — validation checks, eligibility checks, chat messages, FAQ
          searches, and guides you've viewed — is stored only in your own browser's local
          storage. Nothing is uploaded to a server, because this app has no backend.
        </p>
        <p>
          Clearing your browser data, using a different browser, or using private/incognito
          mode will remove this history. You can also clear each tool's history yourself
          using the "Clear" button on that page.
        </p>
      </div>
    </div>
  );
}
