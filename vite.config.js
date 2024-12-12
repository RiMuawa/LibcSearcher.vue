import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { rewriteDefaultAST } from 'vue/compiler-sfc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: { 
    './myAPI' : {
      target : 'https://libc.rip/api/find',
      changeOrigin : true,
      secure : false,
      rewrite:(path) => path.replace(/^\/myAPI/,'')
    }
  }
})
