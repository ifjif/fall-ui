<template>
  <fl-checkbox-all v-model="values">
    <fl-checkbox value="张三" label="张三"></fl-checkbox>
    <fl-checkbox value="李四" type="success" label="李四"></fl-checkbox>
    <fl-checkbox value="王五" type="warning" label="王五"></fl-checkbox>
    <fl-checkbox value="赵六" type="error" label="赵六"></fl-checkbox>
  </fl-checkbox-all>
  <div>选中的值：{{ values }}</div>
</template>
<script setup>
import { ref } from 'vue'
const values = ref([])
</script>
