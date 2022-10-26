
<template>
  <textarea name="" class="textarea" rows="10" v-model="code">

  </textarea>
  <div id="container">
  </div>
</template>
<script setup>
//内置的依赖 
import * as Vue from 'vue'
import  * as compilerSfc from '@vue/compiler-sfc' // .vue
import  * as compilerDom from '@vue/compiler-dom' // 模板
import {createApp} from 'vue'
const code = ref(`
<template>
  <div @click="add">
    {{num}} * 2 = {{double}}
  </div>
</template>

<script>
export default{
  data(){
    return {
      num:1
    }
  },
  computed:{
    double(){
      return this.num*2
    }
  },
  methods:{
    add(){
      this.num++
    }
  }
}
<\/script>
`)

onMounted(()=>{
watch(
  ()=>code.value,
  (value)=>{
    const {descriptor} = compilerSfc.parse(value)
    const {script,style,template} = descriptor
    const compiled = compilerDom.compile(template.content)
    let renderCode = compiled.code.replace(/return\s+?function\s+?render/, () => {
      return 'function render '
    })
    
    renderCode += script.content.replace('export default','const __script = ')
    renderCode += `__script.render = render
console.log(Vue.createApp(__script))
Vue.createApp(__script).mount('#container')    
    
`
   console.log(renderCode)
    const App = new Function('Vue',renderCode)(Vue)
  },
  {immediate:true}
)
})

</script>

<style>

.textarea{
  height:90vh;
  width:45vw;
  display: inline-block;
}
#container{
  vertical-align:top;
  padding:2px;
  border-radius: 2px;
  margin-left:5px;
  border:1px solid black;
  height:90vh;
  width:49vw;
  display: inline-block;
}
</style>