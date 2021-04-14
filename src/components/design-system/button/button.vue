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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Button extends Vue {

  @Prop({default: 'w-button-primary'}) readonly className!: string
  @Prop() readonly text!: string
  @Prop({default: false}) readonly isSubmit!: Boolean
  @Prop({default: false}) readonly isDisabled!: Boolean

  public onClick(): void{
    this.$emit('click')
  }
}
</script>
