
<template>
    <div>
        子组件
        <!-- {{count}}
        <div @click="add">click</div> -->
    </div>
</template>
  
<script setup>
import { computed, onUpdated } from 'vue';

import {useStore} from '../store/gvuex'
let store = useStore()
let count = computed(()=>store.state.count)
function add(){
    store.commit('add',1)
}
onUpdated(function () {
    console.log('子组件更新')
})

</script>
  
<style>
.box {
    background: red;
    height: 100px;
}
</style>