module.exports = {
 content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
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
  },
 },
 darkMode: 'media', // class
 plugins: [require('@tailwindcss/forms')],
};
