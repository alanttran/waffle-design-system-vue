<template>
  <button class="w-button-primary" @click="onClick">
    <!-- @slot default inner button content -->
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',

  methods: {
    onClick() {
      /**
       * Click event
       *
       * @event click
       */
      this.$emit('click')
    }
  }
}
</script>
