<template>
  <div>
    <fl-radio disabled label="primary"></fl-radio>
    <fl-radio type="success" label="success"></fl-radio>
    <fl-radio type="warning" label="warning"></fl-radio>
    <fl-radio disabled type="error" label="error"></fl-radio>
  </div>
  <div>
    <fl-radio label="primary"></fl-radio>
    <fl-radio disabled value="success" v-model="value1" type="success" label="success"></fl-radio>
    <fl-radio disabled value="warning" v-model="value2" type="warning" label="warning"></fl-radio>
    <fl-radio type="error" label="error"></fl-radio>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const value1 = ref('success')
const value2 = ref('warning')
</script>
