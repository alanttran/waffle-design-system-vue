<template>
  <div class="w-card">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props:{
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>
