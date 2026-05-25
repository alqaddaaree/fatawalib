import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://fatawalib.com',
  adapter: vercel(),
  integrations: [react(), tailwind(), sitemap(), keystatic()],
  output: 'hybrid',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
