/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      // Custom blink animation
      keyframes: {
        wiggle: {
          '0%, 100%': { opacity: 100 },
          '30%': { opacity: 0 },
        }
      },
      animation: {
        wiggle: 'wiggle 0.9s ease-in-out infinite',
      }

    },
  },
  plugins: [],
}

