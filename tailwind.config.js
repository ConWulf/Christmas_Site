module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    zIndex: {
      'behind': '-5'
    },
    extend: {
      backgroundImage: theme => ({
        'ornament': "url(../img/pexels-negative-space-177555.jpg)"
      })
    },
  },
  variants: {
    backgroundColor: ['active'],
    boxShadow: ['responsive', 'hover', 'focus'],
    extend: {},
  },
  plugins: [],
}
