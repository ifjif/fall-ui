<template>
  <fl-input v-model="value" clear></fl-input>
  <div>获取的值：{{ value }}</div>
  <fl-button @click="clickEvent">改变值为：'改变值'</fl-button>
</template>
<script setup>
import { ref } from 'vue'
const value = ref('')
const clickEvent = () => {
  value.value = '改变值'
}
</script>
