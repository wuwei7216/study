<template>
  <div class="hello">
    <h1 :[testa+testb]="456">{{ msg }}</h1>
    <div @click="myClick">点击</div>
    <div>{{temData}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      testa: 'i',
      testb: 'd'
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
    myClick() {
      console.log('22222222')
      this.temData = 2
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
