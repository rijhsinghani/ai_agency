import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0E0E0E",
        surface: "#161616",
        "surface-raised": "#1E1E1E",
        cream: "#EDE9E3",
        "cream-dim": "#A8A29E",
        purple: "#7B2FBE",
        "purple-soft": "#9B4FDE",
        cyan: "#4DD9E8",
        orange: "#D97706",
      },
      fontFamily: {
        display: ["Roc Grotesk", "Outfit", "system-ui", "sans-serif"],
        body: ["Gilroy", "DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
