/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { primary: '#EA580C', 'hover-primary': '#AC3A00' },
      height: {
        '1/7': '14.2857%',
        '1/8': '12.5%',
        '6/7': '85.7143%',
      },
    },
  },
  plugins: [],
};
