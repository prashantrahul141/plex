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
          50: '#f0e8ff',
          100: '#cdb1fc',
          200: '#a97cf7',
          300: '#884cf0',
          400: '#6b25e6',
          500: '#5207d9',
          600: '#4700c9',
          700: '#3f00b3',
          800: '#340099',
          900: '#26007b',
          1000: '#14005a',
          1100: '#060038',
        },
      },
    },
  },
  plugins: [],
};
