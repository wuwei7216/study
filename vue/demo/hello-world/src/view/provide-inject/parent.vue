<template>
<div class="parent">
  父亲级别 : <strong>只用作中转</strong>
  <son />
</div>
</template>

<script>
import Son from './son'
export default {
name: 'ProvideParent',
components: { Son }
}
</script>

<style scoped>
.parent{
height:100px;
line-height: 100px;
border: 2px solid  #feafef;
padding:0 10px;
margin-top: 20px;

}
</style>
