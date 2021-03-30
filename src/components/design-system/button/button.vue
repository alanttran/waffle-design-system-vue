<template>
  <button 
    :type="isSubmit ? 'submit' : 'button'" 
    :class="className" 
    :disabled="isDisabled"
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
    isSubmit: {type: Boolean, default: false},
    isDisabled: {type: Boolean, default: false}
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>
