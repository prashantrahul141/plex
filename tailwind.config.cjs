/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      animation: {
        'spin-ease': 'spin .9s ease-in-out infinite',
      },
      fontFamily: {
        unbounded: ['Unbounded'],
        mukta: ['Mukta'],
        ibmplex: ['IBM Plex Mono'],
      },
      colors: {
        baseBackground: { 100: '#141d31', 200: '#0b101b' },
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
        welcomePageGradientColor: {
          1: '#ff930f',
          2: '#fff95b',
          3: '#ff1b6b',
          4: '#45caff',
          5: '#0061ff',
          6: '#60efff',
        },
      },
    },
  },
  plugins: [],
};
