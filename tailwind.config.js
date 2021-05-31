module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      borderRadius: {
        large: '2.5rem',
        large2: '3rem',
        inherit: 'inherit',
      },
      colors: {
        'hero-color': '#010103',
        'hero-down': '#E3E1DC',
        primary: '#291507',
        mud: '#4D270C',
        enamel: '#29150799',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        cursive: ['Mystery Quest', 'cursive'],
      },
      maxWidth: { tiny: '5rem', breed: '23rem' },
      padding: {
        tiny: '1.6px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
