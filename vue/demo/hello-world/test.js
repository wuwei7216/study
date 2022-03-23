const {ref, reactive} = require('vue')
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1

console.log(state)

console.log(Object.getOwnPropertyDescriptor(state, 'count'))