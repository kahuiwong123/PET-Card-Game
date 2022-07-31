/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'proxima-nova':['proxima-nova', 'sans-serif'],
      },
    },
  },
  plugins: [],
}