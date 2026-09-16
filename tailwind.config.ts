import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": "#080808",
        "soft-black": "#111111",
        charcoal: "#171717",
        gold: "#D4AF37",
        "gold-bright": "#F4D35E",
        "gold-start": "#B9871C",
        "gold-end": "#F7DA72",
        cream: "#F7F4EC",
        "soft-gray": "#E7E5E0",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #B9871C 0%, #F7DA72 100%)",
      },
      boxShadow: {
        premium: "0 20px 50px -12px rgba(0,0,0,0.35)",
        gold: "0 10px 30px -8px rgba(212,175,55,0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
