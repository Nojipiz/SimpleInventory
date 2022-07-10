/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#FFFFFF',
      'black': '#323232',
      'green': {
          1: '#B4CE55',
          2: '#6B903C',
        },
      'gray': {
          1:'#f5f5f5',
          2: '#DCDCDD',
          3: '#838383',
        },
    },
  },
  plugins: [],
}
