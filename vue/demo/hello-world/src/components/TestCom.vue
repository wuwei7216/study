<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "custom-input",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  created() {
    console.log(this.modelValue)
  }
};
</script>

<style>
</style>