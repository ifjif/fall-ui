<template>
  <ComponentLayout :anchors="anchors">
    <h2>pagination</h2>
    <div>
      <h3 id="fl-pagination-basic">基础</h3>
      <p>total,prev,pager,next,sizes,jumper</p>
      <fl-pagination v-model:currentPage="page1.currentPage" v-model:pageSize="page1.pageSize" :total="page1.total"
        @change="page1Change"></fl-pagination>
      <p>total,prev,pager,next,sizes,jumper</p>
      <h3 id="fl-pagination-size">大小</h3>
      <h4 id="fl-pagination-size-default">默认</h4>
      <fl-pagination v-model:currentPage="page2.currentPage" v-model:pageSize="page2.pageSize" :total="page2.total"
        :pageSizes="page2.pageSizes"></fl-pagination>
      <h4 id="fl-pagination-size-small">小</h4>
      <fl-pagination size="small" v-model:currentPage="page2.currentPage" v-model:pageSize="page2.pageSize"
        :total="page2.total" :pageSizes="page2.pageSizes"></fl-pagination>
      <h3 id="fl-pagination-layout">布局</h3>
      <h4 id="fl-pagination-layout-total">total</h4>
      <fl-pagination layout="total" v-model:currentPage="page3.currentPage" v-model:pageSize="page3.pageSize"
        :total="page1.total"></fl-pagination>
      <h4 id="fl-pagination-layout-prev">prev</h4>
      <fl-pagination layout="prev" v-model:currentPage="page4.currentPage" v-model:pageSize="page4.pageSize"
        :total="page4.total"></fl-pagination>
      <h4 id="fl-pagination-layout-pager">pager</h4>
      <fl-pagination layout="pager" v-model:currentPage="page5.currentPage" v-model:pageSize="page5.pageSize"
        :total="page5.total"></fl-pagination>
      <h4 id="fl-pagination-layout-next">next</h4>
      <fl-pagination layout="next" v-model:currentPage="page6.currentPage" v-model:pageSize="page6.pageSize"
        :total="page6.total"></fl-pagination>
      <h4 id="fl-pagination-layout-sizes">sizes</h4>
      <fl-pagination layout="sizes" v-model:currentPage="page7.currentPage" v-model:pageSize="page7.pageSize"
        :total="page7.total"></fl-pagination>
      <h4 id="fl-pagination-layout-jumper">jumper</h4>
      <fl-pagination layout="jumper" v-model:currentPage="page8.currentPage" v-model:pageSize="page8.pageSize"
        :total="page8.total"></fl-pagination>
      <h4 id="fl-pagination-layout-some">jumper,sizes,next,pager,prev,total</h4>
      <fl-pagination layout="jumper,sizes,next,pager,prev,total" v-model:currentPage="page9.currentPage"
        :pageSize="page9.pageSize" :total="page9.total"></fl-pagination>
    </div>
    <h3 id="fl-pagination-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-pagination-models">model</h3>
    <fl-table :data="modelData" :columns="columns"></fl-table>
    <h3 id="fl-pagination-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue'
import { columns, eventColumns } from '@/assets/com-props'
import { ref } from 'vue'
const page1 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})

const page1Change = (e) => {
  console.log('事件', e)
  console.log(page1.value)
}

const page2 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000,
  pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
})
const page3 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page4 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page5 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page6 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page7 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page8 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page9 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})

const anchors = [
  { title: '基础', href: '#fl-pagination-basic' },
  {
    title: '大小', href: '#fl-pagination-size',
    children: [
      { title: '默认', href: 'fl-pagination-size-default' },
      { title: '小', href: 'fl-pagination-size-small' },
    ]
  },
  {
    title: '布局', href: 'fl-pagination-layout',
    children: [
      { title: 'total', href: 'fl-pagination-layout-total' },
      { title: 'prev', href: 'fl-pagination-layout-prev' },
      { title: 'pager', href: 'fl-pagination-layout-pager' },
      { title: 'next', href: 'fl-pagination-layout-next' },
      { title: 'sizes', href: 'fl-pagination-layout-sizes' },
      { title: 'jumper', href: 'fl-pagination-layout-jumper' },
      { title: 'jumper,sizes,next,pager,prev,total', href: 'fl-pagination-layout-some' },
    ]
  },
  { title: '属性', href: '#fl-pagination-attrs' },
  { title: 'model', href: '#fl-pagination-models' },
  { title: '事件', href: '#fl-pagination-events' },
]


const data = [
  { name: 'total', type: 'Number', default: '0', value: '', desc: '' },
  { name: 'pageSizes', type: 'Array', default: '[10, 20, 50, 100]', value: '', desc: '' },
  { name: 'layout', type: 'String', default: 'total, prev, pager, next, sizes, jumper', value: 'total, prev, pager, next, sizes, jumper', desc: '' },
  { name: 'size', type: 'String', default: '', value: 'small', desc: '' },
]
const modelData = [
  { name: 'currentPage', type: 'Number', default: '1', value: '' },
  { name: 'pageSize', type: 'Number', default: '10', value: '' },
]

const eventData = [
  { name: 'change', params: '({page,pageSize})', desc: '页改变事件' }
]
</script>
