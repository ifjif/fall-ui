<template>
  <h3>tree</h3>
  <div>
    <fl-tree :data="treeDataR" :showCheckbox="true"></fl-tree>
  </div>
</template>
<script setup>
import { treeData } from '@/assets/treeData';
import { reactive } from 'vue';

const treeDataR = reactive(treeData)
</script>
