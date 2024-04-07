/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#F48400',
        'secondary': '#270039',
        'black-next':'#0F0F0F'
      }
    },
  },
  plugins: [],
}

