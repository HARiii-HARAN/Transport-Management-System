/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0f172a',
          navyLight: '#1e293b',
          blue: '#1d4ed8',
          royal: '#2563eb',
          sky: '#38bdf8',
          orange: '#ea580c',
          orangeLight: '#f97316',
          orangeHover: '#c2410c',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
