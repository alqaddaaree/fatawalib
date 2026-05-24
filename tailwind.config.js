/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#fdfbf7',
          100: '#f9f4e8',
          200: '#f2e9d0',
        },
        sand: {
          100: '#ede4d0',
          200: '#ddd0b2',
          300: '#c9b896',
        },
        teal: {
          800: '#1a4a45',
          900: '#0f2e2b',
        },
        gold: {
          400: '#c9a84c',
          500: '#b8922e',
          600: '#9c7a1e',
        },
      },
      fontFamily: {
        serif:  ['"Libre Baskerville"', 'Georgia', 'serif'],
        sans:   ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      typography: (theme) => ({
        fatwa: {
          css: {
            '--tw-prose-body':        theme('colors.stone[800]'),
            '--tw-prose-headings':    theme('colors.teal[900]'),
            '--tw-prose-links':       theme('colors.teal[800]'),
            '--tw-prose-bold':        theme('colors.stone[900]'),
            '--tw-prose-quotes':      theme('colors.stone[700]'),
            '--tw-prose-quote-borders': theme('colors.gold[400]'),
            'h2': {
              fontFamily: theme('fontFamily.serif').join(', '),
              letterSpacing: '-0.01em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
