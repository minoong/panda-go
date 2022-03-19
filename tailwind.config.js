module.exports = {
 content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
 theme: {
  extend: {
   keyframes: {
    'toast-in-bottom': {
     from: {
      transform: 'translateY(100%)',
     },
     to: {
      transform: 'translateY(0)',
     },
    },
   },
   animation: {
    't-in-bottom': 'toast-in-bottom .7s',
   },
   scale: {
    102: '1.02',
   },

   truncate: {
    lines: {
     1: '1',
     2: '2',
     3: '3',
     5: '5',
     8: '8',
    },
   },
  },
 },
 darkMode: 'media', // class
 plugins: [require('@tailwindcss/forms'), require('tw-elements/dist/plugin'), require('tailwindcss/colors')],
};
