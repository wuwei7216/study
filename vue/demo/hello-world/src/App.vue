<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <MyComponent01/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MyComponent01 from './components/MyComponent01.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    MyComponent01
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
