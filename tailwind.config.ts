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
        forest: {
          DEFAULT: "#2D6A4F",
          dark: "#1B4D35",
          light: "#4A9066",
        },
        sage: {
          DEFAULT: "#E8F5ED",
          border: "#A8D5B5",
          muted: "#C8E6D1",
        },
        cream: {
          DEFAULT: "#F7F4EF",
          warm: "#EDE8DF",
        },
        amber: {
          DEFAULT: "#E9A319",
          light: "#FFF8E7",
          dark: "#7A5500",
        },
        soil: {
          DEFAULT: "#6B4226",
          light: "#9A6242",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      borderRadius: {
        xl: "16px",
      },
      boxShadow: {
        "green-soft": "0 8px 24px rgba(45, 106, 79, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
