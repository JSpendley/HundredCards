/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 0,
          },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fade-in 2s ease-in-out 0.25s 1',
      },
    },
  },
  plugins: [],
};
