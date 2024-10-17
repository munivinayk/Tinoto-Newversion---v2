/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#ff5a5f',
          600: '#e74e53',
        },
      },
    },
  },
  plugins: [],
};