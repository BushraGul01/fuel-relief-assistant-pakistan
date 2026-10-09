import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import FlagMark from "../common/FlagMark.jsx";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-900/10 bg-leaf-700 text-sand-50 dark:border-sand-100/10 dark:bg-ink-900">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <FlagMark size="sm" />
              <span className="font-display text-sm font-semibold">{t("common.appName")}</span>
            </div>
            <p className="mt-3 text-sm text-sand-100/80">{t("footer.tagline")}</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-sand-100/90">
            <Link to="/about" className="focus-ring hover:underline">
              {t("footer.aboutPlatform")}
            </Link>
            <Link to="/privacy" className="focus-ring hover:underline">
              {t("footer.privacyNotice")}
            </Link>
            <Link to="/contact" className="focus-ring hover:underline">
              {t("footer.disclaimerLink")}
            </Link>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-sand-100/75 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 sm:items-center">
            <Info className="h-3.5 w-3.5 shrink-0" />
            {t("footer.disclaimerLong")}
          </p>
          <p>
            © {year} {t("footer.rights")} · {t("footer.madeFor")}
          </p>
        </div>
      </div>
    </footer>
  );
}
