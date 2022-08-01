const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: { max: '420px' },
      xs: { min: '420px', max: '520px' },
      ...defaultTheme.screens
    },
    extend: {
      rotate: {
        30: '30deg',
        50: '50deg',
        60: '60deg'
      },
      borderRadius: ['last', 'first']
    },

    linearBorderGradients: {
      directions: {
        // the default values
        t: 'to top',
        tr: 'to top right',
        r: 'to right',
        br: 'to bottom right',
        b: 'to bottom',
        bl: 'to bottom left',
        l: 'to left',
        tl: 'to top left'
      },
      colors: {
        insta: ['#ec4899', '#fcd34d', '#ef4444']
      },
      background: {
        // the default values
        'gray-50': '#F9FAFB',
        'gray-900': '#111827'
      },
      border: {
        // the default values
        1: '1px',
        2: '2px',
        4: '4px'
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
      scrollbar: ['rounded'],
      linearBorderGradients: ['responsive', 'hover', 'dark']
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-border-gradient-radius'),
    require('@tailwindcss/line-clamp')
  ]
};
