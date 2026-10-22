import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { brandTitle } from './src/config/brand.js';

// Fills %BRAND_TITLE% in index.html from src/config/brand.js
const brandHtml = () => ({
  name: 'brand-html',
  transformIndexHtml: (html) => html.replaceAll('%BRAND_TITLE%', brandTitle),
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const apiUrl = new URL(env.VITE_API_URL);
  const apiOrigin = apiUrl.origin;        // https://360.era-solutions.com
  const apiBasePath = apiUrl.pathname;    // /api.animals/public

  return {
    // Deploy at the domain root by default. Set VITE_BASE_PATH=/folder/ only
    // when the whole app is served from a subdirectory.
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), brandHtml()],
    root: '.',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/storage': {
          target: apiOrigin,                                        // https://360.era-solutions.com
          changeOrigin: true,
          secure: false,
          rewrite: (path) => `${apiBasePath}${path}`,              // /api.animals/public/storage/...
        },
      },
    },
    test: {
      exclude: ['e2e/**', 'node_modules/**'],
    },
  };
});
