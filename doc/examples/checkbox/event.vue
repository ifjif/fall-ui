<template>
  <p>多选框 change事件</p>
  <p>注意：它只能确认当前多选框是否选择</p>
  <fl-checkbox @change="changeEvent" type="success" label="success"></fl-checkbox>
  <div>{{ event }}</div>
</template>
<script setup>
import { ref } from 'vue'
const changeEvent = (value, e) => {
  event.value = `发生change事件,值：${value}, 事件对象：${e}`
}
const event = ref('')
</script>
