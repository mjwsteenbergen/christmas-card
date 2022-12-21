import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: "/merry-christmas",
    build: {
        rollupOptions: {
            input: {
                path: resolve(__dirname, 'index.html'),
            }
        }
    }
})