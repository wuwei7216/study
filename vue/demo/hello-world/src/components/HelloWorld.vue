<template>
  <div class="hello">
    <h1 :[testa+testb]="456">{{ msg }}</h1>
    <div @click="myClick(123)">点击</div>
    <div>{{temData}}</div>
    <hr>
    <div v-if="false" v-show="true">我是if</div>
    <hr>
    <div>
      <!-- eslint-disable-next-line -->
      <li v-for="(value, name, index) in myObject" :key="value" v-if="false">
        {{ index }}. {{ name }}: {{ value }}
      </li>
    </div>
    <hr>
    <my-component v-model:description.xxxsss="myText">
      <template v-slot:default="slotProps">
        <!-- <i class="fas fa-check"></i> -->
        <span class="green">{{ slotProps }}</span>
      </template>
    </my-component>
    <hr>
    <div>1234-{{count}}</div>

  </div>
</template>

<script>
import MyComponent from './MyComponent.vue'
import { ref } from 'vue'
export default {
  name: 'HelloWorld',
  components: {
    'my-component': MyComponent
  },
  props: {
    msg: String
  },
  setup() {
      const count = ref(0)
      console.log('--------------')
      console.log(count)
      return {
        count,

        nested: {
          count
        }
      }
    },
  data() {
    return {
      testa: 'i',
      testb: 'd',
      myText: 'hhh',
      myObject: {
        a: 'hh',
        b: 'xx'
      }
    }
  },
  mounted() {
    this.temData = 2
  },
  computed: {
    temData: {
      get() {
        console.log('111111111111')
        return this.testa + this.testb
      },
      set(newValue,oldVale) {
        console.log(newValue)
        console.log(oldVale) //undefined
      }
    }
  },
  methods: {
    myClick(nem, event) {
      console.log(nem)
      console.log(event)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
