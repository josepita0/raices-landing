import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // URL provisional para el sitemap y canonicals - sustituir por el dominio final definitivo
  site: 'https://raices-intervencion.es',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

