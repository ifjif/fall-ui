<template>
  <div style="height:100%;">
    <fl-scrollbar>
      <h2>日期选择器</h2>
      <fl-date-picker v-model="selectedDate1" @change="handleChange" />
      <h2>多日期选择器</h2>
      <fl-date-picker type="dates" v-model="selectedDate2" @change="handleChange" />
      <h2>范围日期选择器</h2>
      <fl-date-picker range v-model="selectedDate3" @change="handleChange" />

      <h2>周选择器</h2>
      <fl-date-picker type="week" v-model="selectedDate4" @change="handleChange" />

      <h2>月选择器</h2>
      <fl-date-picker type="month" v-model="selectedDate5" @change="handleChange" />
      <h2>多月选择器</h2>
      <fl-date-picker type="months" v-model="selectedDate6" @change="handleChange" />
      <h2>范围月选择器</h2>
      <fl-date-picker type="month" range v-model="selectedDate7" @change="handleChange" />

      <h2>年选择器</h2>
      <fl-date-picker type="year" v-model="selectedDate8" @change="handleChange" />
      <h2>多年选择器</h2>
      <fl-date-picker type="years" v-model="selectedDate9" @change="handleChange" />
      <h2>范围年选择器</h2>
      <fl-date-picker type="year" range v-model="selectedDate10" @change="handleChange" />
    </fl-scrollbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedDate1 = ref('');
const selectedDate2 = ref('');
const selectedDate3 = ref('');
const selectedDate4 = ref('');
const selectedDate5 = ref('');
const selectedDate6 = ref('');
const selectedDate7 = ref('');
const selectedDate8 = ref('');
const selectedDate9 = ref('');
const selectedDate10 = ref('');

const handleChange = (date) => {
  console.log('日期已更改:', date);
};
</script>
