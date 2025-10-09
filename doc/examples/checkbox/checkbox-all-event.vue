<template>
  <p>change事件</p>
  <fl-checkbox-all @change="changeEvent">
    <fl-checkbox value="张三" label="张三"></fl-checkbox>
    <fl-checkbox value="李四" type="success" label="李四"></fl-checkbox>
    <fl-checkbox value="王五" type="warning" label="王五"></fl-checkbox>
    <fl-checkbox value="赵六" type="error" label="赵六"></fl-checkbox>
  </fl-checkbox-all>
  <div>{{ values }}</div>
</template>
<script setup>
import { ref } from 'vue'
const values = ref()
const changeEvent = (value) => {
  values.value = `发送change事件： ${value}`
}
</script>
