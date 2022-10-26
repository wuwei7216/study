import { createApp } from "vue";
import App from './App.vue'

createApp(App)
  .mount('#app')

async function test(){
  await delyError('ref is not defined')
}

async function test2(){
  try{
    await delyError('reactive is not defined')
  }catch(e){
    console.error(e)
  }
}
test()
function delyError(message){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      reject({message})
    },1000)
  })
}
