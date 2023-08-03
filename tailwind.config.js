// const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        blob: 'blob 6s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'scale(1)',
          },
          '33%': {
            transform: 'scale(1.1)',
          },
          '66%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      colors: {
        green_dark: '#479C46',
        green_light: '#8CC53F',
        green_lightx: '#F3F9EB',
        yellow_dark: '#FFCF25',
        pink_dark: '#EC64F9',
        pink_light: '#FCE9FC',
        cyan_dark: '#6CC9F0',
        cyan_light: '#E7F3FD',
        red_third: '#F05B28',
        blue_second: '#6CC9F0',
        yellow_first: '#FEDB33',
      },
      height: {
        '90': '22rem',
        '99': '26rem',
        '110': '110%',
        '120': '120%',
        '130': '130%',
        '140': '140%',
        '150': '150%',
      },
      width: {
        '90': '22rem',
        '98': '25.5rem',
      },
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
        '15': '3.75rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
        'xs': '448px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
        '15': '3.75rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
      },
      maxWidth: {
        '2000': '2000px',
        '3000': '3000px',
        '4000': '4000px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'),],
};
