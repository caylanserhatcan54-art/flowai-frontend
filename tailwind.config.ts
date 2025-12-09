// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        flowBg: "#050816",
        flowCard: "#0b1020",
        flowPrimary: "#4EF3FF",
        flowAccent: "#7A00FF",
      },
    },
  },
  plugins: [],
};
export default config;
