<template>
  <p>只需为radio-group设置v-model即可实现单选，不再需要为每个radio设置同样的v-model值</p>
  <fl-radio-group v-model="value">
    <fl-radio value="张三" label="张三"></fl-radio>
    <fl-radio value="李四" type="success" label="李四"></fl-radio>
    <fl-radio value="王五" type="warning" label="王五"></fl-radio>
    <fl-radio value="赵六" type="error" label="赵六"></fl-radio>
  </fl-radio-group>
  <div>选中的值：{{ value }}</div>
</template>
<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
