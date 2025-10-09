<template>
  <p>单选框尺寸</p>
  <fl-radio size="samll" label="small"></fl-radio>
  <fl-radio type="success" label="default"></fl-radio>
  <fl-radio size="large" type="warning" label="large"></fl-radio>
  <p>单选框组尺寸,如果内部radio自己设置，使用自身的</p>
  <fl-radio-group size="large" v-model="checked">
    <fl-radio value="1" label="large"></fl-radio>
    <fl-radio value="2" size="default" type="success" label="default"></fl-radio>
    <fl-radio value="3" type="warning" label="large"></fl-radio>
  </fl-radio-group>
</template>
<script setup>
import { ref } from 'vue'
const checked = ref('')
</script>
