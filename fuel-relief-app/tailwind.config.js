/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "'Noto Nastaliq Urdu'", "system-ui", "sans-serif"],
        display: ["'Fraunces'", "serif"],
      },
      colors: {
        // Deep evergreen — the brand's dark base (hero, nav, dark mode surface)
        ink: {
          DEFAULT: "#0B2318",
          50: "#E7F0EA",
          100: "#C7DECD",
          700: "#13301F",
          800: "#0E2A1C",
          900: "#0B2318",
          950: "#071A12",
        },
        // Warm cream — the light-mode canvas
        sand: {
          DEFAULT: "#F6F2E7",
          50: "#FBF9F3",
          100: "#F6F2E7",
          200: "#EDE6D3",
        },
        // Leaf green — primary accent, buttons, highlights
        leaf: {
          DEFAULT: "#4F9A5C",
          50: "#EEF7EC",
          100: "#D7EEDA",
          300: "#9BD39E",
          400: "#79C27F",
          500: "#4F9A5C",
          600: "#3B7E49",
          700: "#2F6639",
        },
        // Clay — rejection / caution accent
        clay: {
          DEFAULT: "#B8583B",
          100: "#F3DCD2",
          500: "#B8583B",
          600: "#9A4530",
        },
        // Amber — eligibility / info accent
        amber: {
          DEFAULT: "#C79A3A",
          100: "#F3E7C9",
          500: "#C79A3A",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,35,24,0.06), 0 8px 24px rgba(11,35,24,0.06)",
      },
    },
  },
  plugins: [],
};
