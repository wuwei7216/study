<template>
  <div id="dynamic-component-demo" class="demo">
  <button
     v-for="tab in tabs"
     :key="tab"
     :class="['tab-button', { active: currentTab === tab }]"
     @click="currentTab = tab"
   >
    {{ tab }}
  </button>

<!-- Inactive components will be cached! -->
  <component :is="currentTabComponent"></component>
<!-- <keep-alive>
</keep-alive> -->
</div>
</template>

<script>

import HelloWorld from './HelloWorld.vue'
import MyComponent from './MyComponent.vue'
import MyComponent01 from './MyComponent01.vue'

export default {
  components: {
    'hello-world': HelloWorld,
    'my-component': MyComponent,
    'my-component01': MyComponent01,
  },
  name: "custom-input",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  created() {
    console.log(this.modelValue)
  },
  computed: {
    currentTabComponent() {
      return this.currentTab
    }
  },
  data() {
    return {
      currentTab: 'Home',
      tabs: ['hello-world', 'my-component', 'my-component01']
    }
  }
};
</script>

<style>
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