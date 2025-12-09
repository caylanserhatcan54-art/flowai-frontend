/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        flowBg: "linear-gradient(115deg, #091125, #1a2750, #091125)",
      },
      colors: {
        flowPrimary: "#6c63ff",
        flowSecondary: "#00d4ff",
        flowDark: "#0d1220",
        flowLight: "#e3e8f4",
      },
      boxShadow: {
        flowShadow: "0 8px 30px rgba(108,99,255,0.25)",
      },
    },
  },
  plugins: [],
};
