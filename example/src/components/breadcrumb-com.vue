<template>
  <h3>breakcrumb</h3>
  <div>
    <p>基础用法，文本分隔符</p>
    <fl-breadcrumb separator="/">
      <fl-breadcrumb-item to="/home">首页</fl-breadcrumb-item>
      <fl-breadcrumb-item>活动管理</fl-breadcrumb-item>
      <fl-breadcrumb-item>活动列表</fl-breadcrumb-item>
    </fl-breadcrumb>

    <p>组件用法，vnode分隔符</p>
    <fl-breadcrumb :separator="customArrowIcon">
      <fl-breadcrumb-item to="/home">首页</fl-breadcrumb-item>
      <fl-breadcrumb-item>活动管理</fl-breadcrumb-item>
      <fl-breadcrumb-item>活动列表</fl-breadcrumb-item>
    </fl-breadcrumb>

  </div>
</template>
<script setup>
import { h } from 'vue'
const customArrowIcon = h('span', {
  style: { color: 'red', fontWeight: 'bold', fontSize: '16px' },
}, '>>')
</script>
