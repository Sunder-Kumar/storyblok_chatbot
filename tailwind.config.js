// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/_app.js',
    './index.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
