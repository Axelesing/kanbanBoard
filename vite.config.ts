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
    alias: {
      '@': '/src',
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
      'effector',
      'effector-react',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
      'react-window',
    ],
  },

  build: {
    outDir: 'build',
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].[hash:8].js',
        assetFileNames: 'assets/[ext]/[name].[hash:8].[ext]',
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('react-router')) {
              return 'vendor-router'
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui'
            }
            if (id.includes('@dnd-kit')) {
              return 'vendor-dnd'
            }
            if (id.includes('effector') || id.includes('patronum')) {
              return 'vendor-effector'
            }
            if (id.includes('date-fns') || id.includes('react-window')) {
              return 'vendor-utils'
            }
            return 'vendor'
          }

          // Feature chunks
          if (id.includes('src/features/kanban/ui/')) {
            return 'feature-kanban'
          }
          if (id.includes('src/features/taskModal/ui/')) {
            return 'feature-task-modal'
          }
          if (id.includes('src/widgets/Modal/')) {
            return 'widget-modal'
          }
        },
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
