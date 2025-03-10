module.exports = {
  content: ['./component/**/*.{vue,js}', './layouts/**/*.vue', './pages/**/*.vue'],
  theme: {
    extend: {
      rotate: {
        'y-180': 'rotateY(180deg)',
        'y-back': 'rotateY(-180deg)',
      },
      perspective: {
        1000: '1000px',
      },
    },
  },
  plugins: [],
};

