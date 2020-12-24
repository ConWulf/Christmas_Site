const plugin = require("tailwindcss/plugin");
require('tailwindcss-aspect-ratio');
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    zIndex: {
      'behind': '-5',
      'between': '-3'
    },
    extend: {
      backgroundImage: theme => ({
        'ornament': "url(../img/pexels-char-1263891.jpg)"
      }),
      borderWidth: ['hover', 'focus'],
      boxShadow: ['active'],
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      grow: {
        '0%, 100%': { height: '3rem' },
        '50%': { height: '9rem' },
      },
      animation: {
        grow: 'grow 3s ease-out',
      },
      textColor: [
        'responsive',
        'hover',
        'focus',
        'before',
        'after',
        // If you want to combine it with a pseudo class,
        // use `<pseudo-class>_<pseudo-element>`.
        'hover_before',
        'hover_after',
        'focus_before'
      ],
    },
    aspectRatio: { // defaults to {}
      'none': 0,
      'square': [1, 1], // or 1 / 1, or simply 1
      '16/9': [16, 9],  // or 16 / 9
      '4/3': [4, 3],    // or 4 / 3
      '21/9': [21, 9],  // or 21 / 9
    }
  },
  variants: {
    aspectRatio: ['responsive'],
    backgroundColor: ['active'],
    boxShadow: ['responsive', 'hover', 'focus'],
    extend: {},
  },
  plugins: [
    require('tailwindcss-pseudo-elements'),
    // This plugin is useful in combination with tailwindcss-aspect-ratio.
    ({
      ratios: {
        '16/9': [16, 9],
        '4/3': [4, 3],
        '3/2': [3, 2],
        '1/1': [1, 1],
      },
      variants: ['before', 'hover_before', 'responsive'],
    }),
    plugin(function ({ addUtilities }) {
      addUtilities(
          {
            '.empty-content': {
              content: "''",
            },
          },
          ['before']
      )
    })
  ],
}
