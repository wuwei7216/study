import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import autoPlgin from './src/auto-import'
// import autoTry from './src/auto-try'

export default defineConfig({
  // plugins: [vue(),autoPlgin(),autoTry()],
  plugins: [vue()],
  build:{
    lib:{
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'weiyouyi',
      fileName: (format) => `weiyouyi.${format}.js`
    }
  }
})
