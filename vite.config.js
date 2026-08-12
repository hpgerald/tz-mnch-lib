import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base:'./' + HashRouter is what makes GitHub Pages deep-links work.
export default defineConfig({
  base: './',
  plugins: [react()],
})
