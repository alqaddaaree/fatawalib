import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://fatawalib.com',
  adapter: vercel(),
  integrations: [react(), tailwind(), sitemap()],
  output: 'hybrid',
  content: {
    dir: './src/content',
    markdown: {
      extensions: ['.md', '.mdoc'],
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
