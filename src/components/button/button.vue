<template>
  <button 
    :type="isSubmit ? 'submit' : 'button'" 
    :class="className" 
    @click="onClick">
    <!-- @slot default inner button content -->
    {{ text }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props:{
    className: {type: String, default: 'w-button-primary'},
    text: {type: String, default: 'button'},
    disabled: {type: Boolean, default: false},
    isSubmit: {type: Boolean, default: false}
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>
