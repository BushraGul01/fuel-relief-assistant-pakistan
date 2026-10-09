# Fuel Relief Assistant Pakistan — Frontend (React + Vite)

A **frontend-only** guidance app for Pakistan's fuel relief SMS registration process.
No backend, no database — everything persists to the browser's `localStorage`,
through a single swappable layer (`src/utils/storage.js`) so a real API can be
dropped in later without touching components.

> This platform does not register users with the government and cannot access
> government databases. All plate patterns, eligibility rules, and contact
> details in this build are **illustrative placeholders** — replace them with
> verified official information before using this for real users (see
> `src/data/*.js`).

## Getting started

```bash
npm install
npm run dev       # starts the dev server (http://localhost:5173)
npm run build     # production build, output in dist/
npm run preview   # serve the production build locally
```

Requires Node 18+.

## Stack

React 18 · Vite · Tailwind CSS · React Router DOM · React Hook Form + Zod ·
Framer Motion · i18next (English, Urdu, Pashto, Punjabi — Urdu/Pashto/Punjabi
render right-to-left) · Lucide React icons.

## What's where

```
src/
  utils/storage.js        4-function persistence layer (get/set/remove/clear)
  hooks/                  useLocalStorage, useTheme, useLanguage, useHistoryList, useClickOutside
  i18n/                   i18next setup + 4 locale JSON files (same key set in each)
  data/                   content & rules as plain data (announcements, provinces,
                           rejection reasons, eligibility rules, FAQ ids, contact info)
  components/layout/      Navbar, AnnouncementBar, Footer, Layout (page transitions)
  components/common/      HelpCard, InputField, ResultCard, GuideCard, FAQAccordion,
                           ChatBubble, LanguageSelector, ThemeToggle, PageHeader
  pages/                  Home, Validator, Eligibility, RejectionHelp, Guide,
                           Assistant, FAQ, Contact, About, Privacy
```

## What's stored in localStorage

| Key | Set by |
|---|---|
| `fra:language` | language switcher |
| `fra:theme` | theme toggle |
| `fra:chatHistory` | AI Assistant |
| `fra:eligibilityHistory` | Eligibility Checker |
| `fra:validationHistory` | Registration Validator |
| `fra:dismissedAnnouncements` | Announcement bar |
| `fra:recentlyViewedGuides` | Registration Date Finder |
| `fra:faqRecentSearches` | FAQ search |
| `fra:platformFeedback` | Contact page feedback form |

Each history list is capped (see the `limit` passed to `useHistoryList`) so
storage can't grow unbounded. Every tool with history has a "Clear" action.

## Swapping localStorage for a real backend later

Only `src/utils/storage.js` needs to change. Keep the same four function
signatures (`getItem`, `setItem`, `removeItem`, `clearItem`) but have them call
`fetch()` against your API instead of `window.localStorage`. Every hook and
page already goes through this file, so no component changes are required.

## Known placeholders to replace before production

- `src/data/provinces.js` — plate regex patterns and examples per province
- `src/data/eligibilityRules.js` — cc thresholds and outcomes per vehicle type
- `src/data/contactInfo.js` — helpline number and support email
- `src/pages/Assistant.jsx` — the quick-question answers are static strings;
  swap `pickAnswer()` for a real AI call (see the companion architecture
  document for a prompt-engineering strategy) if you later add a backend
