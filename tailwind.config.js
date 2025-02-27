/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6', // blue-500
          dark: '#60a5fa', // blue-400
        },
        background: {
          light: '#ffffff',
          dark: '#111827', // gray-900
        },
        text: {
          light: '#1f2937', // gray-800
          dark: '#f3f4f6', // gray-100
        }
      },
    },
  },
  plugins: [],
} 