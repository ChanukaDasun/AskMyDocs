import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Set your desired port here
    strictPort: true // Optional: if true, Vite will exit if the port is already in use
  },
  plugins: [react()],
})
