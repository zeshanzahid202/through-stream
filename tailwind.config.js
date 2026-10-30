/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B1320',
        secondary: '#F5F3EE',
        accent: '#D8A84E',
        text: '#111827',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        editorial: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}