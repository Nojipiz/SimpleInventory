/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'phone': { 'max': '450px' },
      'tablet': { 'max': '750px' },
      'laptop': { 'max': '1280px' },
    },
    fontWeight: {
      normal: 400,
      bold: 500,
      thin: 300,
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
    },
    colors: {
      'white': '#FFFFFF',
      'black': '#323232',
      'green': {
        1: '#B4CE55',
        2: '#6B903C',
      },
      'gray': {
        1: '#f5f5f5',
        2: '#DCDCDD',
        3: '#838383',
      },
      'red': '#fb403f',
    },
  },
  plugins: [],
}
