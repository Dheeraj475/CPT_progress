import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '5253-2406-7400-10a-fa23-9475-86bb-f5f6-6d3b.ngrok-free.app'
    ]
  }
})
