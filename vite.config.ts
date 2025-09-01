import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import paths from 'vite-tsconfig-paths'

// https://vite.dev/config/
// eslint-disable-next-line import-x/no-default-export
export default defineConfig({
  plugins: [
    paths(),
    react({
      plugins: [['@swc/plugin-styled-components', { displayName: true }]],
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  build: {
    outDir: 'build',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].[hash:8].js',
        assetFileNames: 'assets/[ext]/[name].[hash:8].[ext]',
      },
    },
  },

  define: {
    __APP_VERSION__: JSON.stringify('0.1.0'),
  },

  server: {
    port: 8080,
    open: true,
  },
})
