import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    assetsInlineLimit: 8192,
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name]-[hash][extname]`,
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    viteStaticCopy({
      targets: [
        {
          src: 'CNAME',
          dest: './'
        },
        {
          src: 'public/assets/*',
          dest: 'assets'
        }
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
