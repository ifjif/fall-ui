<template>
  <fl-button @click="open">开启</fl-button>
  <fl-mask v-if="show">
    <fl-button @click="close">关闭</fl-button>
  </fl-mask>
</template>
<script setup>
import { ref } from 'vue'
const show = ref(false)
const open = () => {
  show.value = true
}
const close = () => {
  show.value = false
}
</script>
