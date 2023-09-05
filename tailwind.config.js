/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        content: "1200px",
      },
      colors: {
        pebble: "#F9F9F9",
        it: "#0000FF",
        violet: "CCCCFF",
        yellow: "#FFF6A3",
        plum: "#080831",
        lightGray: "#EDEDEF",
      },
    },
  },
  plugins: [],
};
