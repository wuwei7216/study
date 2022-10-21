
<template>
    <div>
        {{count}}
        <div @click="add">click</div>
    </div>
</template>
  
<script setup>
import { computed } from 'vue';

import {useStore} from '../store/gvuex'
let store = useStore()
let count = computed(()=>store.state.count)
function add(){
    store.commit('add',1)
}

</script>
  
<style>
.box {
    background: red;
    height: 100px;
}
</style>