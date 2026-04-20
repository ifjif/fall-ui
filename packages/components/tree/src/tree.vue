<template>
  <ul class="my-tree">
    <TreeNode v-for="node in data" :key="node.label" :node="node" :showCheckbox="showCheckbox"
      @state-change="handleStateChange"></TreeNode>
  </ul>
  {{ test.a }}
</template>

<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('tree')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import TreeNode from './tree-node.vue';
const ns = useNamespace('tree')

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  test: {
    type: Object
  }
})

const handleStateChange = (changeNode) => {
  console.log('节点发送变化', changeNode)
}

setTimeout(() => {
  props.test.a = '这是修改后的A'
}, 2000)
</script>
<style scoped>
.my-tree {
  list-style: none;
  padding-left: 20px;
  margin: 0;
}
</style>
