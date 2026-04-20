<template>
  <h1>Loading</h1>
  <div style="margin-bottom: 100px;background-color:yellow;position:relative;height:200px;padding:10px;">
    <fl-loading :loading="loading"></fl-loading>
  </div>

</template>
<script setup>
import { ref } from 'vue'
const loading = ref(true)
</script>
