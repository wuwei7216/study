
<template>
    <div>
        <h1>这是首页</h1>
        <div>{{x}}-{{y}}</div>
        <TodoList />
        <Rate :value="score" :theme="'orange'" @update-rate="update"></Rate>
        <Test />
    </div>
</template>

<script setup>
import TodoList from '../components/TodoList.vue'
import Rate from '../components/Rate.vue';
import Test from '../components/Test.vue';
import { ref } from 'vue';

import {useMouse} from '../utils/mouse'

let { x, y } = useMouse()
let score = ref(3)
function update(val) {
    score = val
}
</script>