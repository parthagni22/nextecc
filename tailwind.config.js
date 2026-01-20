/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nextec: {
          gold: '#ffb606',
          purple: '#442e66',
          blue: '#066aab',
        },
      },
    },
  },
  plugins: [],
}
