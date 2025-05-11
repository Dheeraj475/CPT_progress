import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'b668-2406-7400-10a-3e0e-e469-b1fd-5ee9-ef85.ngrok-free.app'
    ]
  }
})
