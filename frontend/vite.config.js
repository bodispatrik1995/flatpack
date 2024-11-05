// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to Laravel backend
      '/s': {
        target: 'http://backend:80', // Your Laravel backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/p/, ''),
      },
    },
  },
  build: {
    outDir: '../public', // Adjust to where you want to output built files
  },
})
