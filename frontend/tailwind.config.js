/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F48400',
        'primary-hover': '#FF9A24',
        'primary-dark': '#D87300',
        'secondary': '#1A1A1A',
        'black-next': '#0F0F0F',
        'dark': {
          'bg': '#000000',
          'canvas': '#0A0A0A',
          'card': '#141414',
          'surface': '#1A1A1A',
          'border': '#262626',
          'muted': '#888888',
        }
      },
      boxShadow: {
        'glow-primary': '0 0 25px -4px rgba(244, 132, 0, 0.45)',
        'glow-primary-sm': '0 0 12px -2px rgba(244, 132, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
