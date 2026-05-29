/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // we use data-theme, but keep 'class' for fallback
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--bg-page)',
        card: 'var(--bg-card)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          emphasis: 'var(--border-emphasis)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        tag: 'var(--bg-tag)',
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}