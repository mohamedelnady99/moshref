import { themeColors, themeCssVariables, tailwindBrandColors } from './src/config/theme.js';

// Brand colors live in src/config/theme.js — edit them there.

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: tailwindBrandColors(),
        role: {
          admin: { bg: '#FEE2E2', text: '#DC2626' },
          owner: { bg: '#FEF3C7', text: '#D97706' },
          manager: { bg: '#EDE9FE', text: '#7C3AED' },
          shepherd: { bg: '#DBEAFE', text: '#2563EB' },
          doctor: { bg: '#D1FAE5', text: '#059669' },
        },
        danger: '#BA1A1A',
        success: '#059669',
        surface: {
          DEFAULT: '#fafaf5',
          dim: '#eeeee9',
          light: '#F4F4EF',
          high: '#E3E3DE',
        },
        'on-surface': {
          DEFAULT: themeColors.primary,
          variant: '#404943',
          subtle: '#717973',
        },
        tertiary: {
          container: themeColors.accentDark,
          DEFAULT: themeColors.accent,
        },
        outline: {
          DEFAULT: '#c0c9c1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
      },
      boxShadow: {
        card: '0px 4px 16px rgb(var(--color-secondary-rgb) / 0.08)',
        'card-hover': '0px 8px 24px rgb(var(--color-secondary-rgb) / 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    // Expose the brand palette as CSS variables (--color-primary, --color-primary-rgb, ...)
    ({ addBase }) => addBase({ ':root': themeCssVariables() }),
  ],
};