<template>
  <div :class="'w-badge-' + type">
    {{text}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Badge extends Vue {
  @Prop({default: "primary"}) readonly type!: string
  @Prop({default: "badge"}) readonly text!: string
}
</script>
