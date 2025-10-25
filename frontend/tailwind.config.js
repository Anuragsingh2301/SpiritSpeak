/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This tells Tailwind to scan all your component files
  ],
  theme: {
    extend: {

      keyframes: {
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '70%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        popIn: 'popIn 0.3s ease-out',
      }

    },
  },
  plugins: [],
}