<template>
  <p>change事件</p>
  <fl-radio-group @change="changeEvent">
    <fl-radio value="张三" label="张三"></fl-radio>
    <fl-radio value="李四" type="success" label="李四"></fl-radio>
    <fl-radio value="王五" type="warning" label="王五"></fl-radio>
    <fl-radio value="赵六" type="error" label="赵六"></fl-radio>
  </fl-radio-group>
  <div>{{ dis }}</div>
</template>
<script setup>
import { ref } from 'vue'
const dis = ref('')
const changeEvent = (value) => {
  dis.value = `发生change事件，值：${value}`
}
</script>
