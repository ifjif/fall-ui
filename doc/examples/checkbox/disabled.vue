<template>
  <div>
    <fl-checkbox disabled label="primary"></fl-checkbox>
    <fl-checkbox disabled type="success" label="success"></fl-checkbox>
    <fl-checkbox disabled type="warning" label="warning"></fl-checkbox>
    <fl-checkbox disabled type="error" label="error"></fl-checkbox>
  </div>
  <div>
    <fl-checkbox disabled v-model="checked" label="primary"></fl-checkbox>
    <fl-checkbox disabled v-model="checked" type="success" label="success"></fl-checkbox>
    <fl-checkbox disabled v-model="checked" type="warning" label="warning"></fl-checkbox>
    <fl-checkbox disabled v-model="checked" type="error" label="error"></fl-checkbox>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const checked = ref(true)
</script>
