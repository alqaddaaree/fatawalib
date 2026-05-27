/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        literary: {
          'bg-page':       '#FAF8F4',
          'bg-card':       '#F5F1EA',
          'border':        '#E5DFD3',
          'border-dark':   '#C9BC9F',
          'text-primary':  '#2C2418',
          'text-secondary': '#7A6A52',
          'text-muted':    '#9A8A72',
          'accent':        '#8B7355',
          'accent-hover':  '#6B5440',
          'tag-bg':        '#EDE8DF',
        },
      },
      fontFamily: {
        serif:  ['"EB Garamond"', 'Georgia', 'serif'],
        sans:   ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      typography: (theme) => ({
        fatwa: {
          css: {
            '--tw-prose-body':        '#2C2418',
            '--tw-prose-headings':    '#2C2418',
            '--tw-prose-links':       '#8B7355',
            '--tw-prose-bold':        '#2C2418',
            '--tw-prose-quotes':      '#7A6A52',
            '--tw-prose-quote-borders': '#8B7355',
            'h2': {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '400',
              fontStyle: 'italic',
              letterSpacing: 'normal',
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
