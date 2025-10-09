<template>
  <p>可使用v-model来进行双向绑定，如果v-model提供的不是数组，最终选中和非选中，它的值为true和false，如下:</p>
  <fl-checkbox v-model="checked" label="张三" value="张三"></fl-checkbox>
  <fl-checkbox v-model="checked" type="success" label="李四" value="李四"></fl-checkbox>
  <fl-checkbox v-model="checked" type="warning" label="王五" value="王五"></fl-checkbox>
  <fl-checkbox v-model="checked" type="error" label="赵六" value="赵六"></fl-checkbox>
  <div>选中的值: {{ checked }}</div>
  <p>如果想获取到 选中value信息，可为v-model提供数组，然后绑定给您想要的获取的checkbox,如下：</p>
  <fl-checkbox v-model="values" label="张三" value="张三"></fl-checkbox>
  <fl-checkbox v-model="values" type="success" label="李四" value="李四"></fl-checkbox>
  <fl-checkbox v-model="values" type="warning" label="王五" value="王五"></fl-checkbox>
  <fl-checkbox v-model="values" type="error" label="赵六" value="赵六"></fl-checkbox>
  <div>选中的值：{{ values }}</div>
</template>
<script setup>
import { ref } from 'vue'
const checked = ref('1')
const values = ref([])
</script>
