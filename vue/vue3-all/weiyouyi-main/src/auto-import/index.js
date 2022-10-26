
const vue3 = ['ref','computed','reactive','onMounted','watchEffect','watch'] // ....

export default function autoImportPlugin() {
  return {
    name: 'vite-plugin-auto-import', // 必须的，将会在 warning 和 error 中显示
    enforce:'pre',
    transform(code,id){
      vueReg = /\.vue$/
      if(vueReg.test(id)){
        const helpers = new Set()
        vue3.forEach(api=>{
          const reg = new RegExp(api+"(.*)")
          if(reg.test(code)){
            helpers.add(api)
          }
        })
        return code.replace('<script setup>',`<script setup>

import {${[...helpers].join(',')}} from 'vue' //俺是自动导入的        
`)
      }
      return code
    }
  }
}