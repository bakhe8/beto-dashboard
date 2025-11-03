const colors = require('@betodashboard/tokens/colors.json');
module.exports = {
  content: ['./src/**/*.{html,js,ts}'],
  theme: {
    extend: {
      colors: colors.primary,
      backgroundColor: colors.mode.light,
      textColor: colors.mode.light,
    }
  },
  plugins: []
}

