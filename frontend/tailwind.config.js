const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        blue: "#31766F",
        lightGreen: "#5B7958",
        darkGreen: "#3A472E",
        lightSoil: "#C29F86",
        darkSoil: "#6D4419",
      },
      fontFamily: {
        nun: ["Nunito", "sans-serif", ...defaultTheme.fontFamily.sans],
        play: ["Playfair Display", "serif", ...defaultTheme.fontFamily.sans],
        pop: ["Poppins", "sans-serif", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/hero.jpg')",
      },
    },
  },
  plugins: [],
};
