import COLORS from "./src/config/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: COLORS,
      fontFamily: {
        custom: ["Maloney", "sans"],
      },
    },
  },
  plugins: [],
};
