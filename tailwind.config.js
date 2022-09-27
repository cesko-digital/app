/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        content: "1160px",
      },
      colors: {
        pebble: "#F9F9F9",
        it: "#0000FF",
        violet: "CCCCFF",
      },
    },
  },
  plugins: [],
};
