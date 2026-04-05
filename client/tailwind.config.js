/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Raleway"', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#1E3A8A',     // Deep Trust Blue
          lightBlue: '#3B82F6',// Accessible Blue
          orange: '#EA580C',   // Action / Joy Orange
          lightOrange: '#FFF7ED', // Soft background orange
          gray: '#4B5563',     // Accessible text gray
          light: '#F9FAFB',    // Page background
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
