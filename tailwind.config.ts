import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f1ff",
          100: "#ebe5ff",
          200: "#d9d0ff",
          300: "#bfadff",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6c5ce7",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        dark: {
          50: "#2a2a4a",
          100: "#1a1a3a",
          200: "#12122a",
          300: "#0f0f23",
          400: "#0a0a1a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
