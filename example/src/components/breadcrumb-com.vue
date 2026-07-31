<template>
  <ComponentLayout :anchors="anchors">
    <h2>breakcrumb</h2>
    <div>
      <h3 id="fl-breadcrumb-basic">基础</h3>
      <fl-breadcrumb>
        <fl-breadcrumb-item to="/home">首页</fl-breadcrumb-item>
        <fl-breadcrumb-item>活动管理</fl-breadcrumb-item>
        <fl-breadcrumb-item>活动列表</fl-breadcrumb-item>
      </fl-breadcrumb>

      <h3 id="fl-breadcrumb-text-separator">文本分隔符</h3>
      <fl-breadcrumb separator=">">
        <fl-breadcrumb-item to="/button-com">首页</fl-breadcrumb-item>
        <fl-breadcrumb-item>活动管理</fl-breadcrumb-item>
        <fl-breadcrumb-item>活动列表</fl-breadcrumb-item>
      </fl-breadcrumb>

      <h3 id="fl-breadcrumb-vnode-separator">vnode分隔符</h3>
      <fl-breadcrumb :separator="customArrowIcon">
        <fl-breadcrumb-item to="/home">首页</fl-breadcrumb-item>
        <fl-breadcrumb-item>活动管理</fl-breadcrumb-item>
        <fl-breadcrumb-item>活动列表</fl-breadcrumb-item>
      </fl-breadcrumb>

    </div>
    <h3 id="fl-breadcrumb-attrs">breadcrumb属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-breadcrumb-slots">breadcrumb插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>

    <h3 id="fl-breadcrumb-item-attrs">breadcrumb-item属性</h3>
    <fl-table :data="itemData" :columns="columns"></fl-table>
    <h3 id="fl-breadcrumb-item-slots">breadcrumb-item插槽</h3>
    <fl-table :data="itemSlotData" :columns="slotColumns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { columns, slotColumns } from '@/assets/com-props';
import { h } from 'vue'
const customArrowIcon = h('span', {
  style: { color: 'red', fontWeight: 'bold', fontSize: '16px' },
}, '>>')

const anchors = [
  { title: '基础', href: "#fl-breadcrumb-basic" },
  { title: '文本分隔', href: "#fl-breadcrumb-text-separator" },
  { title: 'vnode分隔符', href: "#fl-breadcrumb-vnode-separator" },
  { title: 'breadcrumb属性', href: '#fl-breadcrumb-attrs' },
  { title: 'breadcrumb插槽', href: '#fl-breadcrumb-slots' },
  { title: 'breadcrumb-item属性', href: '#fl-breadcrumb-item-attrs' },
  { title: 'breadcrumb-item插槽', href: '#fl-breadcrumb-item-slots' },
]

const data = [
  { name: 'separator', type: 'String, Object, Function', default: '/', value: '' },
]

const slotData = [
  { name: 'default', param: '', desc: '只能放一级breadcrumb-item,可v-for' },
]

const itemData = [
  {
    name: 'to', type: 'String, Object', default: '', value: '', desc: 'vue-router信息，如提供会渲染为 router-link\
    支持 字符串 和 对象路径 xx / {path: xxx}' },
]
const itemSlotData = [
  { name: 'default', param: '', desc: '' },
]
</script>
