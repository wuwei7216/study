<!--  -->
<template>
  <div>
    <div class="lazy-load-div">

    </div>
    <img data-src="../assets/icon/a.png" alt="暂无图片" >
    <img data-src="../assets/icon/b.png" alt="暂无图片" >
    <img data-src="../assets/icon/c.png" alt="暂无图片" >
  </div>
</template>

<script>
import { LazyLoad } from './lazyLoad'
export default {
  name: 'LazyLoad',
  components: {},
  data () {
    return {
    };
  },
  computed: {},
  created() {},
  mounted() {
    const imgs = document.getElementsByTagName('img')
    // eslint-disable-next-line no-debugger
    new LazyLoad(imgs)
  },
  methods: {

  }
}
</script>

<style scoped>
.lazy-load-div {
  height: 800px;
  width: 500px;
  background-color: red;
}
</style>