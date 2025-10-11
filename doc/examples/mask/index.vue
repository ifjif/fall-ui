<template>
  <fl-button @click="clickEvent1">显示</fl-button>
  <fl-mask v-show="dis" @close="closeEvent1" style="zIndex:1000"></fl-mask>
</template>
<script setup>
import { ref } from 'vue'
const dis = ref(false)
const clickEvent1 = () => {
  dis.value = true
}
const closeEvent1 = () => {
  dis.value = false
}
</script>
