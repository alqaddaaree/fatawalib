import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

import alpinejs from '@astrojs/alpinejs';

export default defineConfig({
  site: 'https://fatawalib.vercel.app/',
  adapter: vercel(),
  integrations: [react(), tailwind(), sitemap(), alpinejs()],
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