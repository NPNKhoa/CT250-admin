/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: { colors: { primary: '#EA580C', 'hover-primary': '#ac3a00' } },
  },
  plugins: [],
};
