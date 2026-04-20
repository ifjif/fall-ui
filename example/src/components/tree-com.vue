<template>
  <h3>tree</h3>
  <div>
    <fl-tree :data="treeDataR" :test="test" :showCheckbox="true"></fl-tree>
  </div>
</template>
<script setup>
import { treeData } from '@/assets/treeData';
import { reactive } from 'vue';

const treeDataR = reactive(treeData)
const test = reactive({ a: '这是A' })
</script>
