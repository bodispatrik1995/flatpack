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
      '/server': {
        target: 'http://backend:8000', // Your Laravel backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/server/, ''),
      },
    },
  },
  build: {
    outDir: '../public', // Adjust to where you want to output built files
  },
})
