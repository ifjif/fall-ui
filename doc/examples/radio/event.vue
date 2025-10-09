<template>
  <p>change事件</p>
  <fl-radio @change="changeEvent" value="张三" label="张三"></fl-radio>
  <div>{{ dis }}</div>
</template>
<script setup>
import { ref } from 'vue'
const dis = ref('')
const changeEvent = (value) => {
  dis.value = `发送change事件，值：${value}`
}
</script>
