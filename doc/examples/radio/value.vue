<template>
  <fl-radio value="张三" label="张三"></fl-radio>
  <fl-radio value="李四" type="success" label="李四"></fl-radio>
  <fl-radio value="王五" type="warning" label="王五"></fl-radio>
  <fl-radio value="赵六" type="error" label="赵六"></fl-radio>
  <p>要想让单选框成为一组，只选择其中一个值，请为它们设置相同的v-model值</p>
  <fl-radio v-model="checked" value="张三" label="张三"></fl-radio>
  <fl-radio v-model="checked" value="李四" type="success" label="李四"></fl-radio>
  <fl-radio v-model="checked" value="王五" type="warning" label="王五"></fl-radio>
  <fl-radio v-model="checked" value="赵六" type="error" label="赵六"></fl-radio>
  <div>选中的值：{{ checked }}</div>
</template>
<script setup>
import { ref } from 'vue'
const checked = ref('')
</script>
