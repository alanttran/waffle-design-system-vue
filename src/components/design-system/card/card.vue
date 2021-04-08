<template>
  <div class="w-card">
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Card extends Vue{
}
</script>
