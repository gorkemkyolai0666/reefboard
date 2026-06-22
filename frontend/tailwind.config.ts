import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#0B1D3A',
          950: '#060E1A',
        },
        coral: {
          50: '#FFF0F0',
          100: '#FFD4D4',
          200: '#FFB0B0',
          300: '#FF8A8A',
          400: '#FF6B6B',
          500: '#E85555',
          600: '#CC4444',
          700: '#A63333',
          800: '#802828',
          900: '#5C1E1E',
        },
        reef: {
          50: '#E6FFF5',
          100: '#B3FFE0',
          200: '#80FFCB',
          300: '#4DFFB5',
          400: '#00D4AA',
          500: '#00B894',
          600: '#009975',
          700: '#007A5E',
          800: '#005C47',
          900: '#003D2F',
        },
        sand: {
          50: '#FDFAF5',
          100: '#F8F0E3',
          200: '#F0DFC3',
          300: '#E5CC9E',
          400: '#D4B478',
          500: '#C09B56',
          600: '#A68240',
          700: '#846730',
          800: '#624D24',
          900: '#42341A',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
