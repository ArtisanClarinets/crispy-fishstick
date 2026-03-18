import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vantus: {
          ink: {
            950: "#0C131A",
          },
          navy: {
            800: "#16334F",
            900: "#10283B",
          },
          blue: {
            600: "#2E6B94",
            700: "#244A6D",
          },
          sky: {
            500: "#50A5D0",
          },
          steel: {
            400: "#6C92A6",
          },
          cream: {
            "050": "#F9F8F4",
          },
          slate: {
            200: "#D8DEE2",
            500: "#4F6170",
            700: "#334657",
          },
        },
      },
      fontFamily: {
        heading: [
          "var(--font-poppins)",
          "Arial",
          "Helvetica",
          "sans-serif",
        ],
        body: [
          "var(--font-lora)",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "4rem", fontWeight: "700" }],
        "heading-1": ["2.75rem", { lineHeight: "3.25rem", fontWeight: "700" }],
        "heading-2": ["2.25rem", { lineHeight: "2.75rem", fontWeight: "700" }],
        "heading-3": ["1.75rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        "heading-4": ["1.375rem", { lineHeight: "1.875rem", fontWeight: "600" }],
        "body-l": ["1.25rem", { lineHeight: "2rem", fontWeight: "400" }],
        "body-m": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "400" }],
        "body-s": ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        label: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "600" }],
      },
      borderRadius: {
        brand: "10px",
        "brand-sm": "8px",
        "brand-lg": "12px",
        pill: "999px",
      },
      transitionTimingFunction: {
        vantus: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        base: "180ms",
        slow: "260ms",
      },
    },
  },
  plugins: [],
};
export default config;
