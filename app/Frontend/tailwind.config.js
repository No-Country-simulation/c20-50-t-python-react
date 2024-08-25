/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Add your colors here
      },
    },
    animation: {
      blink: "blink 1s infinite",
      pulse_delay_200: "pulse 1s infinite 0.2s",
      pulse_delay_400: "pulse 1s infinite 0.4s",
    },
    keyframes: {
      blink: {
        "0%": { opacity: "1" },
        "50%": { opacity: "0.5" },
        "100%": { opacity: "1" },
      },
    },
    colors: {
      ...colors,
    },
  },
  plugins: [],
};
