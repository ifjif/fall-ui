<template>
  <div :class="[ns.b()]">
    <ul>
      <TreeNode v-for="node in data" :node="node" :level="0" :show-checkbox="showCheckbox"></TreeNode>
    </ul>
  </div>
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
import TreeNode from '../tree-node/tree-node.vue'
import { useTree } from './composables/use-tree';
const ns = useNamespace('tree')

const props = defineProps({
  data: { // [{label, children:[]}, ...] // 对象内部状态 checked indeterminate parent
    type: Array,
    required: true
  },
  showCheckbox: {
    type: Boolean,
    default: true
  }
})

const {

} = useTree()
</script>
