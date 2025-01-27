/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "chart-bg": "#1a1a2e",
        "card-bg": "#16213e",
        accent: "#0099ff",
      },
      backgroundColor: {
        primary: "#1a1a2e",
        secondary: "#16213e",
      },
      textColor: {
        primary: "#e6e6e6",
        secondary: "#8a8a8a",
      },
    },
  },
  plugins: [],
};
