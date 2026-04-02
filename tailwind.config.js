/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a8a', // Navy Blue (Tailwind blue-900)
          dark: '#172554', // blue-950
          light: '#1e40af', // blue-800
        },
        secondary: {
          DEFAULT: '#f8fafc', // slate-50
          dark: '#f1f5f9', // slate-100
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
