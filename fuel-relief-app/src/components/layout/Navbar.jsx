import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FlagMark from "../common/FlagMark.jsx";
import LanguageSelector from "../common/LanguageSelector.jsx";
import ThemeToggle from "../common/ThemeToggle.jsx";

const NAV_LINK_CLASS =
  "focus-ring relative pb-1 transition-all duration-200 hover:-translate-y-0.5 hover:text-leaf-700 dark:hover:text-leaf-300 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-leaf-600 after:transition-transform after:duration-300 hover:after:scale-x-100 dark:after:bg-leaf-300";

const ACTIVE_CLASS = "text-leaf-700 dark:text-leaf-300 after:scale-x-100";

function scrollToHelpCenter() {
  // Small delay lets the route render before we try to find the section.
  requestAnimationFrame(() => {
    document.getElementById("help-center")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/" && location.hash !== "#help-center";
  const isHelpCenter = location.pathname === "/" && location.hash === "#help-center";

  const handleHelpCenterClick = (e) => {
    e.preventDefault();
    navigate("/#help-center");
    if (location.pathname === "/") {
      scrollToHelpCenter();
    } else {
      // Home mounts fresh here; give it a tick to render before scrolling.
      setTimeout(scrollToHelpCenter, 60);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-sand-50/90 backdrop-blur dark:border-sand-100/10 dark:bg-ink-950/90">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="focus-ring flex items-center gap-2 rounded-lg">
          <FlagMark />
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold text-ink-900 dark:text-sand-50">
              {t("common.appName")}
            </span>
            <span className="block text-[11px] font-medium tracking-wide text-ink-900/60 dark:text-sand-100/60">
              {t("common.appSubtitle")}
            </span>
          </span>
        </NavLink>

        <ul className="hidden items-center gap-6 text-sm font-medium text-ink-900/80 dark:text-sand-100/80 md:flex">
          <li>
            <NavLink
              to="/"
              end
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`${NAV_LINK_CLASS} ${isHome ? ACTIVE_CLASS : ""}`}
            >
              {t("nav.home")}
            </NavLink>
          </li>
          <li>
            <a
              href="/#help-center"
              onClick={handleHelpCenterClick}
              className={`${NAV_LINK_CLASS} ${isHelpCenter ? ACTIVE_CLASS : ""}`}
            >
              {t("nav.helpCenter")}
            </a>
          </li>
          <li>
            <NavLink to="/faq" className={({ isActive }) => `${NAV_LINK_CLASS} ${isActive ? ACTIVE_CLASS : ""}`}>
              {t("nav.faqs")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => `${NAV_LINK_CLASS} ${isActive ? ACTIVE_CLASS : ""}`}>
              {t("nav.contact")}
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
