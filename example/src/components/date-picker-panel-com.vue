<template>
  <ComponentLayout :anchors="anchors">
    <h2>日期选择面板</h2>
    <h3 id="fl-date-picker-panel-day">日</h3>
    <fl-date-picker-panel></fl-date-picker-panel>
    <h3 id="fl-date-picker-panel-days">多日</h3>
    <fl-date-picker-panel type="dates" range></fl-date-picker-panel>
    <h3 id="fl-date-picker-panel-week">周</h3>
    <fl-date-picker-panel type="week"></fl-date-picker-panel>
    <h3 id="fl-date-picker-panel-month">月</h3>
    <fl-date-picker-panel type="month"></fl-date-picker-panel>
    <h3 id="fl-date-picker-panel-months">多月</h3>
    <fl-date-picker-panel type="months"></fl-date-picker-panel>
    <h3 id="fl-date-picker-panel-year">年</h3>
    <fl-date-picker-panel type="year"></fl-date-picker-panel>
    <h3 id="fl-date-picker-panel-years">多年</h3>
    <fl-date-picker-panel type="years"></fl-date-picker-panel>
    <h3 id="fl-date-picker-panel-range-day">范围日</h3>
    <fl-date-picker-panel range></fl-date-picker-panel>
    <h3 id="fl-date-picker-panel-range-month">范围月</h3>
    <fl-date-picker-panel range type="month"></fl-date-picker-panel>
    <h3 id="fl-date-picker-panel-range-year">范围年</h3>
    <fl-date-picker-panel range type="year"></fl-date-picker-panel>

    <h3 id="fl-date-picker-panel-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-date-picker-panel-models">model</h3>
    <fl-table :data="modelData" :columns="columns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { columns } from '@/assets/com-props';

const anchors = [
  { title: '日', href: '#fl-date-picker-panel-day' },
  { title: '多日', href: '#fl-date-picker-panel-days' },
  { title: '周', href: '#fl-date-picker-panel-week' },
  { title: '月', href: '#fl-date-picker-panel-month' },
  { title: '多月', href: '#fl-date-picker-panel-months' },
  { title: '年', href: '#fl-date-picker-panel-year' },
  { title: '多年', href: '#fl-date-picker-panel-years' },
  { title: '范围日', href: '#fl-date-picker-panel-range-day' },
  { title: '范围月', href: '#fl-date-picker-panel-range-month' },
  { title: '范围年', href: '#fl-date-picker-panel-range-year' },
  { title: '属性', href: '#fl-date-picker-panel-attrs' },
  { title: 'model', href: '#fl-date-picker-panel-models' },
]


const data = [
  { name: 'type', type: 'String', default: 'date', value: 'date, dates, week, month, months, year, years', desc: '' },
  {
    name: 'range', type: 'Boolean', default: 'false', value: 'true, false', desc:
      'data,month,year支持'
  },
  { name: 'disabled', type: 'Boolean', default: 'false', value: 'true, false', desc: '' },
]
const modelData = [
  { name: '', type: 'String, Object, Array', default: '', value: '', desc: '' },
]
</script>
