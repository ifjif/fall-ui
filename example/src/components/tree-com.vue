<template>
  <h3>tree</h3>
  <p>带选择框</p>
  <div>
    <fl-tree :data="treeDataR" :showCheckbox="true"></fl-tree>
  </div>
  <p>不带选择框</p>
  <div>
    <fl-tree :data="treeDataR" :showCheckbox="false"></fl-tree>
  </div>
</template>
<script setup>
import { treeData } from '@/assets/treeData';
import { reactive } from 'vue';

const treeDataR = reactive(treeData)
</script>
