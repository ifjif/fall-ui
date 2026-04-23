<template>
  <li class="tree-node">
    <div class="node-content" @click="handleClick">
      <!-- 展开/收起图标 -->
      <span v-if="hasChildren" class="expand-icon">
        {{ expanded ? '-' : '+' }}
      </span>
      <span v-else class="leaf-icon"></span>
      <!-- 复选框 -->
      <input v-show="showCheckbox" type="checkbox" :checked="node.checked" :indeterminate="node.indeterminate"
        @click.stop @change="handleCheckChange($event.target.checked)" />
      <!-- 节点标签 -->
      <span class="node-label">
        {{ node.label }}
      </span>
    </div>
    <!-- 递归渲染子节点 -->
    <ul v-show="expanded" v-if="hasChildren">
      <TreeNode v-for="child in node.children" :key="child.label" :node="child" :parent="node"
        :showCheckbox="showCheckbox" @state-change="$emit('state-change', $event)">
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
import { computed, ref } from 'vue'
const ns = useNamespace('tree-node')

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  parent: {
    type: Object, default: null
  },
  showCheckbox: Boolean
})

props.node.parent = props.parent

const emit = defineEmits(['state-change'])

// 处理复选框变化
const handleCheckChange = (isChecked) => {
  // 1.更新当前节点状态
  props.node.checked = isChecked
  props.node.indeterminate = false

  // 2.向下联动：同步更新所有子节点的状态
  propagateDown(props.node, isChecked)

  // 3.向上汇总：通知父节点重新计算状态
  propagateUp(props.parent)

  // 4.触发事件，通知顶层组件
  emit('state-change', props.node)
}

// 向下联动 递归设置所有子节点状态
const propagateDown = (node, isChecked) => {
  if (!node.children) return

  node.children.forEach(child => {
    child.checked = isChecked
    child.indeterminate = false
    propagateDown(child, isChecked)
  })
}

// 向上汇总：递归更新所有父节点的状态
const propagateUp = (node) => {
  if (!node) return // 到达根节点，停止递归

  //统计当前节点所有子节点的选中情况
  const totalChildren = node.children.length
  const checkedChildren = node.children.filter(child => child.checked).length
  const hasIndeterminateChildren = node.children.some(child => child.indeterminate)

  // 根据子节点的状态，计算当前父节点的新状态
  if (checkedChildren === 0 && !hasIndeterminateChildren) {
    // 1.所有子节点都未选中 -> 父节点不选
    node.checked = false
    node.indeterminate = false
  } else if (checkedChildren === totalChildren) {
    // 2.所有子节点都选中 -> 父节点全选
    node.checked = true
    node.indeterminate = false
  } else {
    // 情况3：部分子节点选中 -> 父节点半选
    node.checked = false
    node.indeterminate = true
  }

  // 继续向上通知，让祖先节点也重新计算状态
  propagateUp(node.parent)
}

// 判断是否有子节点
const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0
})

// 控制展开 / 收起
const expanded = ref(true)

const handleClick = () => {
  if (hasChildren.value) {
    expanded.value = !expanded.value
    return
  }
  // 是叶子节点，触发 toggle
  handleCheckChange(!props.node.checked)
}
</script>
<style scoped>
.tree-node {
  margin: 4px 0;
}

.tree-node ul {
  list-style: none;
  padding-left: 20px;
  margin: 0;
}

.node-content {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.node-content:hover {
  background-color: #f5f7fa;
}

.expand-icon,
.leaf-icon {
  display: inline-block;
  width: 16px;
  text-align: center;
  margin-right: 4px;
  font-weight: bold;
  color: #606266;
}

.node-label {
  font-size: 14px;
  color: #606266;
}

.node-children {
  padding-left: 20px;
}

/* 简单的展开收起动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: 500px;
  opacity: 1;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
