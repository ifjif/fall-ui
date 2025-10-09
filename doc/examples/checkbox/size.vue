<template>
  <p>单多选框大小</p>
  <fl-checkbox size="small" label="primary"></fl-checkbox>
  <fl-checkbox type="success" label="success"></fl-checkbox>
  <fl-checkbox size="large" type="warning" label="warning"></fl-checkbox>
  <p>多选框组大小，如果内部多选框设置了不会使用组的设置</p>
  <fl-checkbox-group size="large" v-model="group">
    <fl-checkbox value="1" label="primary"></fl-checkbox>
    <fl-checkbox value="2" size="default" type="success" label="success"></fl-checkbox>
    <fl-checkbox value="3" type="warning" label="warning"></fl-checkbox>
  </fl-checkbox-group>
  <p>全选框大小，如果内部多选框设置了不会使用组的设置</p>
  <fl-checkbox-all v-model="all" size="small">
    <fl-checkbox value="1" label="primary"></fl-checkbox>
    <fl-checkbox value="2" size="default" type="success" label="success"></fl-checkbox>
    <fl-checkbox value="3" type="warning" label="warning"></fl-checkbox>
  </fl-checkbox-all>
</template>
<script setup>
import { ref } from 'vue'

const group = ref([])
const all = ref([])
</script>
