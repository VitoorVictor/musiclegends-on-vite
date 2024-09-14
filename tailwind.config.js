/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark-10': '#131313',
        'brand-color': '#EB4848',
        'gray-10' : '#929292',
      },
    },
  },
  plugins: [],
}