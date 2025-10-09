<template>
  <div :class="['code-action']" @mouseleave="mouseleaveEvent">
    <fl-icon>
      <FlCode @click="openEvent" />
    </fl-icon>
    <fl-icon>
      <FlFileCopy @click="copyEvent" />
    </fl-icon>
  </div>
</template>
<script setup>
const emit = defineEmits(['open', 'copy'])
const openEvent = () => {
  emit('open')
}
const copyEvent = () => {
  emit('copy')
}
</script>
<style scoped>
.code-action {
  padding-top: 10px;
  display: flex;
  justify-content: right;
  font-size: 28px;
  column-gap: 20px;
}
</style>
