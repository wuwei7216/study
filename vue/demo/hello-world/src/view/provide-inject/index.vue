<template>
<div class="grandPa">
  爷爷级别 : <strong>{{ nameObj.name }} 今年 <i class="blue">{{ age }}</i>岁， 城市<i class="yellow">{{ city }}</i></strong>
  <child />
  <br>
  <br>
  <el-button type="primary" plain @click="changeName">改变名称</el-button>

</div>
</template>

<script>
import child from './parent.vue'
export default {
name: 'ProvideGrandPa',
components: { child },
data: function() {
  return {
    nameObj: {
      name: '小布'
    },
    age: 12,
    city: '北京'
  }
},
provide() {
  return {
    nameObj: this.nameObj,   //传入一个可监听的对象
    cityFn: () => this.city,  //通过computed来计算注入的值
    age: this.age  //直接传值

  }
},
methods: {
  changeName() {
    if (this.nameObj.name === '小布') {
      this.nameObj.name = '貂蝉'
      this.city = '香港'
      this.age = 24
    } else {
      this.nameObj.name = '小布'
      this.city = '北京'
      this.age = 12
    }
  }
}
}
</script>

<style  scoped>
.grandPa{
width: 600px;
height:100px;
line-height: 100px;
border: 2px solid  #7fffd4;
padding:0 10px;
text-align: center;
margin:50px auto;
}
</style>
