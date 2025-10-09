<template>
  <p>如果想要获得 选中的value值，这时只需要为checkbox-group设置v-model，值为数组即可,而无须再为每个checkbox设置相同的v-model值</p>
  <fl-checkbox-group v-model="values">
    <fl-checkbox label="张三" value="张三"></fl-checkbox>
    <fl-checkbox type="success" label="李四" value="李四"></fl-checkbox>
    <fl-checkbox type="warning" label="王五" value="王五"></fl-checkbox>
    <fl-checkbox type="error" label="赵六" value="赵六"></fl-checkbox>
  </fl-checkbox-group>
  <div>选中的值：{{ values }}</div>
</template>
<script setup>
import { ref } from 'vue'
const values = ref([])
</script>
