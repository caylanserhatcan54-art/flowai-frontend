/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        flowBg: "#0A072F",
        flowPrimary: "#6B4EFF",
        flowSecondary: "#AA98FF",
      },
    },
  },
  plugins: [],
};
