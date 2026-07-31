<template>
  <li :class="[ns.b()]" @click.stop="handleClick">
    <div :class="[ns.e('wrapper-content')]" :style="[indentStyle]">
      <!-- 展开关闭图标 -->
      <span v-if="hasChildren" :class="[ns.e('expand-icon')]">
        {{ expanded ? '-' : '+' }}
      </span>
      <span v-else :class="[ns.e('leaf-icon')]"></span>

      <input v-if="showCheckbox" type="checkbox" :checked="node.checked" @click.stop :indeterminate="node.indeterminate"
        @change="handleCheckChange($event.target.checked)" />

      <span :class="[ns.e('label')]">
        <slot v-if="$slots.label" name="label" :item="node" />
        <template v-else>
          {{ node.label }}
        </template>
      </span>
    </div>
    <ul v-if="hasChildren" v-show="expanded">
      <TreeNode @check-change="$emit('check-change')" v-for="child in node.children" :node="child" :level="level + 1"
        :show-checkbox="showCheckbox" :parent="node">
        <template v-if="$slots.label" #label="{ item }">
          <slot name="label" :item="item" />
        </template>
      </TreeNode>
    </ul>
  </li>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('tree-node')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import TreeNode from './tree-node.vue'
import { useTreeNode } from './composables/use-tree-node';
const ns = useNamespace('tree-node')

const props = defineProps({
  node: { //{label, children:[]} 内置的属性 checked, indeterminate, parent
    type: Object,
    required: true
  },
  level: {
    type: Number,
    default: 0
  },
  showCheckbox: {
    type: Boolean,
    default: true
  },
  parent: {  // 此节点的父节点
    type: Object,
    default: null
  }
})

// 设置父节点
props.node.parent = props.parent
const emit = defineEmits(['check-change'])

const {
  hasChildren,
  expanded,
  handleClick,
  handleCheckChange,
  indentStyle
} = useTreeNode(props, emit)

</script>
