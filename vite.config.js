import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/personal-portfolio-react/', // 確保與你目前的網址路徑一致
  css: {
    preprocessorOptions: {
      scss: {
        // 使用現代編譯器 API
        api: 'modern-compiler',
        // 關鍵：安靜模式，不顯示依賴套件（如 Bootstrap）的警告
        quietDeps: true, 
        // 針對你目前噴出的警告類型進行屏蔽
        silenceDeprecations: [
          'import', 
          'global-builtin', 
          'color-functions', 
          'legacy-js-api'
        ],
      },
    },
  },
})
