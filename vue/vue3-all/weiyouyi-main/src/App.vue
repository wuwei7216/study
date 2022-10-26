<template>
  <div @click="add">
    {{num}} * 2 = {{double}}
  </div>
</template>

<script setup>
let num = ref(1)
let double = computed(()=>num.value*2)

function add(){
  num.value++
}
onMounted(()=>{
  console.log('mounted')
})

</script>