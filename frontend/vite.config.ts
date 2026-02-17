import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto', // Automatically inject service worker registration
      includeAssets: ['**/*.{png,jpg,jpeg,svg,ico,woff,woff2}'],
      manifest: false, // Using manual manifest.json in public folder
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,ico,woff,woff2}'],
        runtimeCaching: [
          // Google Fonts Stylesheets
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
            }
          },
          // Google Fonts Webfonts
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module',
      }
    })
  ],
  // Build Optimization Configuration (Phase 7)
  build: {
    // Enable source maps for debugging (production)
    sourcemap: false,
    
    // Set chunk size warning limit
    chunkSizeWarningLimit: 600,
    
    // Report compressed size for better metrics
    reportCompressedSize: true,
    
    // Optimize CSS
    cssCodeSplit: true,
    
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    
    // Rollup options for manual chunking
    rollupOptions: {
      output: {
        // Manual chunks for better caching and code splitting
        manualChunks: {
          // Separate React and ReactDOM into vendor chunk
          'react-vendor': ['react', 'react-dom'],
          
          // Separate Framer Motion (large animation library)
          'framer-motion': ['framer-motion'],
          
          // Separate Lucide React icons
          'lucide-icons': ['lucide-react'],
          
          // Separate html2canvas (for image saving)
          'html2canvas': ['html2canvas']
        },
        
        // Better file naming for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    
    // Target modern browsers for smaller bundle
    target: 'es2015',
    
    // Enable CSS minification
    cssMinify: true
  },
  
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react', 'html2canvas']
  }
})
