<template>
  <ComponentLayout :anchors="anchors">
    <h2>Loading</h2>
    <h3 id="fl-loading-basic">基础</h3>
    <div style="margin-bottom: 100px;background-color:yellow;position:relative;height:200px;padding:10px;">
      <fl-loading :loading="loading"></fl-loading>
    </div>
    <h3 id="fl-loading-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
  </ComponentLayout>

</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { columns } from '@/assets/com-props';
import { ref } from 'vue'
const loading = ref(true)

const anchors = [
  { title: '基础', href: '#fl-loading-basic' },
  { title: '属性', href: '#fl-loading-attrs' },
]

const data = [
  { name: 'loading', type: 'Boolean', default: 'false', value: 'true, false', desc: '' },
]
</script>
