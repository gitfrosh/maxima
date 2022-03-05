const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      teal: colors.teal,
      grey: colors.grey,
      gray: colors.gray,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
    },
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
}