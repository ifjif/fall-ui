<template>
  <div>
    <h2>日期选择器示例</h2>
    <fl-date-picker v-model="selectedDate" @change="handleChange" />
    <p>选中的日期是: {{ selectedDate }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedDate = ref('');

const handleChange = (date) => {
  console.log('日期已更改:', date);
};
</script>
