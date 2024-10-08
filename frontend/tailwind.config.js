/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#d64ae1'
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)'
          }
        }
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite'
      }
    },
  },
  plugins: [],
}

