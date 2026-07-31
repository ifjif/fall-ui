<template>
  <ComponentLayout :anchors="anchors">
    <h2>日期选择器</h2>
    <h3 id="fl-date-picker-day">日期选择</h3>
    <fl-date-picker v-model="selectedDate1" @change="handleChange" />
    <h3 id="fl-date-picker-days">多日期选择</h3>
    <fl-date-picker type="dates" v-model="selectedDate2" @change="handleChange" />
    <h3 id="fl-date-picker-range-date">范围日期选择</h3>
    <fl-date-picker range v-model="selectedDate3" @change="handleChange" />

    <h3 id="fl-date-picker-week">周选择</h3>
    <fl-date-picker type="week" v-model="selectedDate4" @change="handleChange" />

    <h3 id="fl-date-picker-month">月选择</h3>
    <fl-date-picker type="month" v-model="selectedDate5" @change="handleChange" />
    <h3 id="fl-date-picker-months">多月选择</h3>
    <fl-date-picker type="months" v-model="selectedDate6" @change="handleChange" />
    <h3 id="fl-date-picker-range-month">范围月选择</h3>
    <fl-date-picker type="month" range v-model="selectedDate7" @change="handleChange" />

    <h3 id="fl-date-picker-year">年选择</h3>
    <fl-date-picker type="year" v-model="selectedDate8" @change="handleChange" />
    <h3 id="fl-date-picker-years">多年选择</h3>
    <fl-date-picker type="years" v-model="selectedDate9" @change="handleChange" />
    <h3 id="fl-date-picker-range-year">范围年选择</h3>
    <fl-date-picker type="year" range v-model="selectedDate10" @change="handleChange" />

    <h3 id="fl-date-picker-attrs">属性</h3>
    <fl-table :data="data" :columns="columns">
      <template #default="{ row }">
        <pre>{{ row.default }}</pre>
      </template>
    </fl-table>
    <h3 id="fl-date-picker-models">model</h3>
    <fl-table :data="modelData" :columns="columns"></fl-table>
    <h3 id="fl-date-picker-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
  </ComponentLayout>
</template>

<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { ref } from 'vue';
import { columns, eventColumns } from '@/assets/com-props';

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

const anchors = [
  { title: '日期选择', href: '#fl-date-picker-day' },
  { title: '多日期选择', href: '#fl-date-picker-days' },
  { title: '范围日期选择', href: '#fl-date-picker-range-date' },
  { title: '周选择', href: '#fl-date-picker-week' },
  { title: '月选择', href: '#fl-date-picker-month' },
  { title: '多月选择', href: '#fl-date-picker-months' },
  { title: '范围月选择', href: '#fl-date-picker-range-month' },
  { title: '年选择', href: '#fl-date-picker-year' },
  { title: '多年选择', href: '#fl-date-picker-years' },
  { title: '范围年选择', href: '#fl-date-picker-range-year' },
  { title: '属性', href: '#fl-date-picker-attrs' },
  { title: 'model', href: '#fl-date-picker-models' },
  { title: '事件', href: '#fl-date-picker-events' },
]

const shortCuts_ = [
  {
    text: '今天',
    value: '() => {\
      const d = new Date()\
      return d\
    }'
  },
  {
    text: '昨天',
    value: '() => {\
      const d = new Date()\
      d.setDate(d.getDate() - 1)\
      return d\
    }'
  },
  {
    text: '本周',
    value: '() => {\
      const d = new Date()\
      return new Date(d.setDate(d.getDate() - d.getDay() + 1))\
    }'
  },
  {
    text: '本月',
    value: '() => {\
      const d = new Date()\
      return new Date(d.getFullYear(), d.getMonth(), 1)\
    }'
  }
]


const data = [
  { name: 'placeholder', type: 'String', default: '请选择日期', value: '', desc: '' },
  { name: 'type', type: 'String', default: 'date', value: 'date, dates, week, month, months, year, years', desc: '' },
  {
    name: 'range', type: 'Boolean', default: 'false', value: 'true, false', desc:
      'date,month,year支持'
  },
  { name: 'shortCuts', type: 'Array', default: JSON.stringify(shortCuts_, null, 2), value: '', desc: '侧边栏快捷键' },
  { name: 'format', type: 'String', default: 'YYYY-MM-DD', value: '', desc: '显示文本' },
]
const modelData = [
  { name: '', type: 'String, Date, Array', default: '', value: '', desc: '' },
]
const eventData = [
  { name: 'change', params: '(v)', desc: '新值' }
]
</script>
