<template>
  <fl-input v-model="data" clear></fl-input>
  <div>获取的值：{{ data }}</div>
  <fl-button @click="clickEvent">改变值为：'改变值'</fl-button>
</template>
<script setup>
import { ref } from 'vue'
const data = ref('')
const clickEvent = () => {
  data.value = '改变值'
}
</script>
