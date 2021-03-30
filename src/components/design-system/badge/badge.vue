<template>
  <div :class="'w-badge-' + type">
    {{text}}
  </div>
</template>

<script>
export default {
  name: "Badge",
  props: {
    type: { type: String, default: "primary" },
    text:{type: String, default: "badge"}
  },
};
</script>
