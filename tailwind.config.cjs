/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ['Unbounded'],
        mukta: ['Mukta'],
        ibmplex: ['IBM Plex Mono'],
      },
      colors: {
        baseBackground: '#0b101b',
        themePrimary: {
          50: '#f8fbff',
          100: '#bad3fd',
          200: '#7dabf8',
          300: '#4686f5',
          400: '#1d68e9',
          500: '#0050dd',
          600: '#0047cd',
          700: '#003cb8',
          800: '#002ca0',
          900: '#000c85',
          1000: '#170069',
        },
      },
    },
  },
  plugins: [],
};
