<template>
  <div :class="[ns.b()]">
    <ul>
      <TreeNode @check-change="handleCheckChange" v-for="node in data" :node="node" :level="0"
        :show-checkbox="showCheckbox">
        <template v-if="$slots.label" #label="{ item }">
          <slot name="label" :item="item" />
        </template>
      </TreeNode>
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
import { provide, watch, onMounted } from 'vue'
import { TREE_KEY } from '../constants';
const ns = useNamespace('tree')

const props = defineProps({
  data: { // [{id, label, children:[]}, ...] // 对象内部状态 checked indeterminate parent
    type: Array,
    required: true
  },
  showCheckbox: {
    type: Boolean,
    default: true
  },
  defaultCheckedKeys: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['check-change'])

const {
  getCheckedKeys,
  setCheckedKeys,
  handleCheckChange,
  propagateUp,
  propagateDown,
} = useTree(props, emit)

provide(TREE_KEY, { propagateUp, propagateDown })

defineExpose({
  getCheckedKeys
})

// key 变化时执行初始化
watch(() => props.defaultCheckedKeys, (keys) => {
  if (keys.length) {
    setCheckedKeys(keys)
  }
})

onMounted(() => {
  if (props.data && props.defaultCheckedKeys.length > 0)
    setCheckedKeys(props.defaultCheckedKeys)
})
</script>
