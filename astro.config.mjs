import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  site: 'https://www.arklens.ch',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
