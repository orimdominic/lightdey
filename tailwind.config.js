module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'gt-phone': '425px',
      },
      colors: {
        mustard: {
          100: '#fef3cd',
          200: '#feedb4',
          300: '#fde69b',
          400: '#fdda68',
          500: '#ffd700',
          600: '#fcce36',
          700: '#fbc104',
          800: '#d3a303',
          900: '#b08703',
        },
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
};
