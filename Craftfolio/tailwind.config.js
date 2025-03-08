// tailwind.config.js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,php}'],
  darkMode: 'class',
  theme: {

    screens: {
      // Width-based breakpoints
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
      xxxl: '1600px',
      '4xl': '1800px',

      // Height-based breakpoints
      'tall-xs': { raw: '(min-height: 480px)' },
      'tall-sm': { raw: '(min-height: 576px)' },
      'tall-md': { raw: '(min-height: 768px)' },
      'tall-lg': { raw: '(min-height: 992px)' },
      'tall-xl': { raw: '(min-height: 1024px)' },
      'tall-xxl': { raw: '(min-height: 1200px)' },

      'wide-tall-md': { raw: '(min-width: 768px) and (min-height: 768px)' },
    },

    extend: {
      fontFamily: {
        satoshi: ['"satoshi"', 'sans-serif'],
      },

      colors: {
        primary: '#1fb254',
        'primary-2': '#051e0e',
        'primary-3': '#093418',
        'primary-4': '#147135',
        'primary-5': '#082B14',
        'primary-6': '#0B3A1B',
        secondary: '#251608',

        accent1: '#ffc427',
        accent2: '#2ef171',
        accent3: '#1e5af3',
        accent4: '#d8e523',
        accent5: '#ff6320',
        accent6: '#20d7ff',
        accent7: '#664A00',
        accent8: '#041644',
        accent9: '#565B0B',
        accent10: '#BF64F6',
        accent11: '#44066A',
        accent12: '#5C1C00',
        accent13: '#A80379',
        accent14: '#4B0136',
        accent15: '#003F4D',
        accent16: '#20D5FF',
        accent17: '#D7049B',
        accent18: '#0A4551',

        accent19: '#FEEE91',
        accent20: '#7CF5FF',
        accent21: '#FFD7C4',
        accent22: '#D5FFD0',
        accent23: '#5AB2FF',
        accent24: '#88D66C',
        accent25: '#083640',
        accent26: '#0F2E1A',
        accent27: '#b55ce1',
        accent28: '#20302F',
        accent29: '#A8EE66',
        accent30: '#5EBA67',

        neutral1: '#ffffff',
        neutral2: '#f2f2f2',
        neutral3: '#b3b6b9',
        neutral4: '#f8f8f8',
        neutral5: '#E8E8E8',
        neutral6: '#FAFAFA',
        neutral7: '#CCCCCC',
        neutral8: '#515151',
        neutral9: '#161616',
        neutral10: '#e5e5e5',
        neutral11: '#222426',
        neutral12: '#1A1A1A',
        dark: '#000000',
        light: '#ffffff',
      },
      backgroundImage: {
        'radial': 'radial-gradient(circle at 50%, #fff 9%, rgba(255, 255, 255, 0.25) 48%, rgba(255, 255, 255, 0) 74%)',
        'linear': 'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.30) 49.77%, rgba(255, 255, 255, 0.00) 100%)',
        'linear-2': 'linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.60) 100%)',
        'linear-dark': 'linear-gradient(90deg, rgba(232, 232, 232, 0.00) 0%, rgba(130, 130, 130, 0.30) 49.65%, rgba(130, 130, 130, 0.00) 100%)',
      },

      spacing: {
        '13': '52px',
        '15': '60px',
        '30': '120px',
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      // A more concise way to extend grid column spans
      gridColumn: {
        ...Object.fromEntries(
          Array.from({ length: 24 }, (_, i) => [
            `span-${i + 1}`,
            `span ${i + 1} / span ${i + 1}`
          ])
        )
      },
      transitionProperty: {
        'max-h': 'max-height',
        'min-h': 'min-height',
        'max-w': 'max-width',
        'min-w': 'min-width',
        'w': 'width',
        'h': 'height',
      },
      transitionTimingFunction: {
        'craftfolio-ease': 'cubic-bezier(.215,.61,.355,1);',
      },
      textStroke: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
        '7': '7px',
        '8': '8px',
        '9': '9px',
        '10': '10px',
      },

      writingMode: {
        'horizontal-tb': 'horizontal-tb',
        'vertical-rl': 'vertical-rl',
        'vertical-lr': 'vertical-lr',
      },

      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
      // custom shadow
      dropShadow: {
        'cs-1': '0px 6px 40px rgba(0, 0, 0, 0.30)',
        'cs-2': '0px 6px 68.8px rgba(0, 0, 0, 0.40)',
      }

    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const textStrokeWidths = theme('textStroke')
      const textStrokeColors = theme('colors')

      const strokeWidthUtilities = Object.entries(textStrokeWidths).map(([key, value]) => ({
        [`.text-stroke-${key}`]: {
          '-webkit-text-stroke-width': value,
        },
      }))
      const strokeColorUtilities = Object.entries(textStrokeColors).map(([key, value]) => ({
        [`.text-stroke-${key}`]: {
          '-webkit-text-stroke-color': value,
        },
      }))

      // writing mode
      const newUtilities = {
        '.writing-mode-horizontal': { 'writing-mode': 'horizontal-tb' },
        '.writing-mode-vertical-rl': { 'writing-mode': 'vertical-rl' },
        '.writing-mode-vertical-lr': { 'writing-mode': 'vertical-lr' },

        '.animate-paused': {
          'animation-play-state': 'paused',
        },
        '.animate-running': {
          'animation-play-state': 'running',
        }
      };

      addUtilities(newUtilities, ['responsive', 'hover', 'group-hover'])
      addUtilities([...strokeWidthUtilities, ...strokeColorUtilities], ['responsive'])
    },
  ],
}

