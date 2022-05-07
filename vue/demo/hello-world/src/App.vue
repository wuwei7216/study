<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
  <MyComponent01/> -->
  <!-- <button
    v-for="tab in tabs"
    :key="tab"
    :class="['tab-button', { active: currentTab1 === tab }]"
    @click="onclick(tab)"
  >
    {{ tab }}
  </button> -->
  <div>
  <img alt="Vue logo" src="./assets/logo.png">
    <div class="ico ico-a"></div>
    <div class="ico ico-b"></div>
    <div class="ico ico-c"></div>
    <!-- <TestCom v-model="currentTab1"/> -->
    <!-- <keep-alive><TestCom :is="currentTabComponent1"></TestCom></keep-alive> -->
    <!-- <TestCom></TestCom> -->
    <Lazy-Load></Lazy-Load>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import MyComponent01 from './components/MyComponent01.vue'
// import TestCom from "./components/TestCom.vue";
import LazyLoad from "./components/LazyLoad.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    // TestCom,
    // MyComponent01,
    LazyLoad
  },
  methods: {
    onclick(tab) {
      console.log(tab)
      this.currentTab1 = tab
    }
  },
  watch: {
    currentTab1(val){
      console.log(val)
    }
  },
  computed: {
    currentTabComponent1() {
      console.log("tab1-" + this.currentTab1.toLowerCase());
      return "tab1-" + this.currentTab1.toLowerCase();
    },
  },
  data() {
    return {
      currentTab1: "Home",
      tabs: ["Home", "Posts", "Archive"],
    };
  },
};
</script>

<style>
@import '~@/spritesmith-generated/sprite.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.demo-tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
