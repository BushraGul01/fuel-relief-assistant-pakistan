// Homepage help-center cards. Rendered with .map() — add a card here and it
// appears on the homepage automatically, no JSX changes needed.
export const HELP_CARDS = [
  { id: "validate", icon: "ShieldCheck", to: "/validator", tone: "leaf", titleKey: "cards.validate.title", descKey: "cards.validate.desc" },
  { id: "eligibility", icon: "HelpCircle", to: "/eligibility", tone: "clay", titleKey: "cards.eligibility.title", descKey: "cards.eligibility.desc" },
  { id: "rejection", icon: "Info", to: "/rejection-help", tone: "amber", titleKey: "cards.rejection.title", descKey: "cards.rejection.desc" },
  { id: "guide", icon: "CalendarDays", to: "/guide", tone: "sky", titleKey: "cards.guide.title", descKey: "cards.guide.desc" },
  { id: "assistant", icon: "Bot", to: "/assistant", tone: "violet", titleKey: "cards.assistant.title", descKey: "cards.assistant.desc" },
];
