const tailwindcss = require('tailwindcss');
// module.exports = {
//   plugins: [
//     'postcss-preset-env',
//     tailwindcss,
//     'postcss-nested'
//   ],
// };
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Add this if you need it
    'postcss-nesting': {},
  },
};
