<template>
  <div>
      <input type="text"
      :value="description"
      @input="$emit('update:description', $event.target.value)">
      <hr>
      <div>
          <ul>
            <li v-for="( item, index ) in items" :key="index">
                <slot :item="item" :index="index" :another-attribute="123" name="default"></slot>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
    name: 'my-component',
    props: ['description', 'descriptionModifiers'],
    emits: ['update:description'],
    data() {
        return {
            items: [1,2,3,4]
        }
    },
    created() {
        console.log(this.descriptionModifiers) // { capitalize: true }
    }
}
</script>

<style>

</style>