import { useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage.js";
import { useClickOutside } from "../../hooks/useClickOutside.js";

export default function LanguageSelector() {
  const { current, languages, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="focus-ring flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white/70 px-3 py-1.5 text-sm font-medium text-ink-900 hover:bg-white dark:border-sand-100/15 dark:bg-white/5 dark:text-sand-100 dark:hover:bg-white/10"
      >
        <Globe className="h-4 w-4" />
        {current.native}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-xl border border-ink-900/10 bg-white py-1 shadow-soft dark:border-sand-100/15 dark:bg-ink-800"
        >
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={lang.code === current.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setOpen(false);
                }}
                className="focus-ring flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-sand-100 dark:hover:bg-white/10"
              >
                <span>
                  {lang.native}{" "}
                  <span className="text-ink-900/50 dark:text-sand-100/50">· {lang.label}</span>
                </span>
                {lang.code === current.code && <Check className="h-4 w-4 text-leaf-600" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
