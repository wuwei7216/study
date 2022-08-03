<template>
<div class="son">
  孙子级别 : <strong>{{ nameObj.name }} 今年 <i class="blue">{{ age }}</i>岁， 城市<i class="yellow">{{ city }}</i></strong>
</div>
</template>

<script>
export default {
name: 'ProvideSon',
//inject 来获取的值
inject: ['nameObj', 'age', 'cityFn'],
computed: {
  city() {
    return this.cityFn()
  }
}
}
</script>

<style scoped>
.son{
  height:100px;
  line-height: 100px;
  padding:0 10px;
  margin: 20px;
  border: 1px solid #49e2af;
}
</style>

