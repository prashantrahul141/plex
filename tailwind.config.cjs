/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        righteous: ["Righteous"],
        roboto: ["roboto"],
        ubuntu: ["ubuntu"],
      },
      colors: {
        baseBackground: { 400: "#19212a", 500: "hsl(214, 20%, 10%)" },
        themePrimary: {
          50: "#f2f8ff",
          100: "#b4d4fc",
          200: "#78b0f7",
          300: "#448fef",
          400: "#1b72e3",
          500: "#005bd4",
          600: "#0051c0",
          700: "#0043a7",
          800: "#003188",
          900: "#001566",
          1000: "#030042",
        },
      },
    },
  },
  plugins: [],
};
