import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // '/api/products': 'http://localhost:3000',
  //     // '/api/users': 'http://localhost:3000',
  //     '/api': 'http://localhost:3000',
  //   }
  // }
});
