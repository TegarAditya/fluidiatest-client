/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        display: ["'DM Serif Display'", 'sans-serif'],
        space_grotesk: ["'Space Grotesk'", 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
