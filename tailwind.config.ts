/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        flowBlue: "#3b82f6",
      },
      backgroundImage: {
        heroPattern:
          "linear-gradient(180deg, rgba(8,12,28,1) 0%, rgba(3,6,18,1) 100%)",
      },
      boxShadow: {
        cardGlow: "0px 0px 40px rgba(57,122,252,0.35)",
      },
    },
  },
  plugins: [],
};
