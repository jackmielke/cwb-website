import typography from '@tailwindcss/typography'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#FFFFFF', 2: '#EDF1F2', 3: '#D9E0E3' },
        ink: { DEFAULT: '#0B1D29', 2: '#13303F', 3: '#46596A' },
        rust: { DEFAULT: '#AD4E25', deep: '#8A3A18', light: '#D9774A' },
        brass: { DEFAULT: '#F2B530', light: '#F8D27C' },
        sea: { DEFAULT: '#2F6B73', light: '#7FAFAF' },
        sqs: { text: '#2b2b2b', muted: '#6b6b6b', line: '#e2e2e2' },
      },
      fontFamily: {
        display: ['Archivo', 'Arial', 'sans-serif'],
        sans: ['Archivo', 'Arial', 'sans-serif'],
        mono: ['Archivo', 'Arial', 'sans-serif'],
        opensans: ['"Open Sans"', 'Arial', 'sans-serif'],
        franklin: ['"Libre Franklin"', 'Arial', 'sans-serif'],
      },
      maxWidth: { site: '1360px' },
      keyframes: {
        rise: { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'none' } },
        drift: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(6px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        kenburns: { '0%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        rise: 'rise .9s cubic-bezier(.2,.7,.2,1) both',
        drift: 'drift 3s ease-in-out infinite',
        marquee: 'marquee 60s linear infinite',
        kenburns: 'kenburns 14s ease-out both',
      },
    },
  },
  plugins: [typography],
}
