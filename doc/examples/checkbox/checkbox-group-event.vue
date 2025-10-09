<template>
  <p>change事件，这时组中的checkbox发送改变后即可触发，值为改变后的值</p>
  <fl-checkbox-group @change="changeEvent">
    <fl-checkbox label="张三" value="张三"></fl-checkbox>
    <fl-checkbox type="success" label="李四" value="李四"></fl-checkbox>
    <fl-checkbox type="warning" label="王五" value="王五"></fl-checkbox>
    <fl-checkbox type="error" label="赵六" value="赵六"></fl-checkbox>
  </fl-checkbox-group>
  <div>{{ values }}</div>
</template>
<script setup>
import { ref } from 'vue'
const values = ref()
const changeEvent = (value) => {
  values.value = `发生change事件，值：${value}`
}
</script>
