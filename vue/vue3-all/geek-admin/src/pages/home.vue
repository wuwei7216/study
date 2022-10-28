
<template>
    <div>
        <h1>这是首页</h1>{{a}}
        <div>{{x}}-{{y}}</div>
        <TodoList />
        <Rate :value="score" :theme="'orange'" @update-rate="update"></Rate>
        <Test :title="a" />
    </div>
</template>

<script setup>
import TodoList from '../components/TodoList.vue'
import Rate from '../components/Rate.vue';
import Test from '../components/Test.vue';
import { ref, onUpdated } from 'vue';

import { useMouse } from '../utils/mouse'
let a = ref(1)
let { x, y } = useMouse()
let score = ref(3)
function update(val) {
    score = val
}
onUpdated(function () {
    console.log('父组件更新')
})
// setTimeout(() => {
//     x++
// }, 1);
</script>