
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        'ramadan-green': '#1e3a2f',
        'ramadan-cream': '#fdf8f0',
        'ramadan-gold': '#d4a24e',
        'ramadan-light-amber': '#f5e6c8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'lantern-glow': 'radial-gradient(circle at center, #fdf8f0 0%, #f5e6c8 40%, #fdf8f0 100%)',
      }
    },
  },
  plugins: [],
}
