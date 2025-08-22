import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
    host: true
  },
  build: {
    // Оптимизация bundle
    target: 'es2020',
    minify: 'esbuild', // Используем esbuild вместо terser
    rollupOptions: {
      output: {
        // Оптимальное разделение кода
        manualChunks: {
          // React и основные библиотеки
          vendor: ['react', 'react-dom'],
          // Формы и валидация
          forms: ['zod', '@emailjs/browser'],
          // SEO и аналитика
          analytics: ['react-helmet-async', 'react-ga4'],
          // UI компоненты
          ui: [
            './src/components/ui/Button.tsx',
            './src/components/ui/Input.tsx',
            './src/components/ui/Card.tsx',
            './src/components/ui/Toast.tsx'
          ]
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        }
      }
    },
    // Увеличиваем лимит для больших чанков
    chunkSizeWarningLimit: 1000
  },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-helmet-async',
      'zod',
      '@emailjs/browser'
    ]
  }
})
