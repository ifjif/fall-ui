<template>
  <nav class="my-menu" :class="[`is-${mode}`, { 'is-collapse': isCollapse }]">
    <ul class="menu-list">
      <!-- 遍历顶层菜单数据，并使用 menu-item组件进行渲染-->
      <fl-menu-item :active-index="activeIndex" v-for="item in menuData" :key="item.index" :menu="item"
        :open-indices="openIndices" :accordion="realAccordion" :is-collapse="isCollapse" :mode="mode"
        @select="handleSelect" @toggle="handleToggle"></fl-menu-item>
    </ul>
  </nav>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
import { ref, watch, computed } from 'vue'
const ns = useNamespace('menu')
export default {
  name: ns.b()
}
</script>
<script setup>

const props = defineProps({
  menuData: {
    type: Array,
    required: true
  },
  activeIndex: { type: String, default: '' },
  accordion: { type: Boolean, default: false }, // 手风琴模式开关
  isCollapse: { type: Boolean, default: false }, // 控制折叠状态
  mode: {
    type: String,
    validator(m) {
      return ['vertical', 'horizontal'].includes(m)
    }
    , default: 'vertical'
  } // 菜单模式
})

const emit = defineEmits(['select'])

const realAccordion = computed(() => {
  // horizontal 没有 手风琴或非手风琴区别，一律非手风琴
  if (props.mode === 'horizontal') {
    return false
  }
  return props.accordion
})

// 将子组件的选择事件继续向上抛出
const handleSelect = (index) => {
  emit('select', index)
}

// 辅助函数 根据 index 查找菜单项
const findMenuItem = (items, index) => {
  for (const item of items) {
    if (item.index === index) return item
    if (item.children) {
      const found = findMenuItem(item.children, index)
      if (found) return found
    }
  }
  return null
}
// 辅助函数 找 menuItem 的parent
const findSiblings = (menus, item) => {
  if (menus.includes(item)) {
    return menus.filter(m => m !== item)
  }

  let result
  menus.find(menu => {
    if (menu.children) {
      result = findSiblings(menu.children, item)
    }
    return result
  })

  return result
}

// 需要展开的 列表
// 根据 activeIndex和accordion模式计算需要展开的菜单
const openIndices = ref([])

const getUniqueIndices = () => {
  return [...new Set(openIndices.value)]
}

// 根据 activeIndex 递归查找所有的父级
const updateOpenIndices = () => {
  const targetPath = props.activeIndex
  const keys = []

  const findParent = (items) => {
    for (const item of items) {
      // 1.如果找到了 目标项
      if (item.index === targetPath) {
        return true
      }

      // 2.如果有孩子，递归查找
      if (item.children && item.children.length) {
        if (findParent(item.children)) {
          keys.push(item.index) // 找到了，把爸爸加入进去
          return true
        }
      }
    }
    return false
  }
  findParent(props.menuData)


  // 如果是 手风琴模式，需要关闭同级的其他菜单
  if (realAccordion.value) {
    // 顶层 活跃 
    if (keys.length <= 0) {
      openIndices.value = []
      return
    }

    const targetParentIndex = keys[keys.length - 1] // 目标菜单的直接父级
    const parentItem = findMenuItem(props.menuData, targetParentIndex)

    if (parentItem && parentItem.children) {
      // 过滤掉 同级的 其它菜单索引
      const newKeys = keys.filter(key => {
        // 保留 目标路径的父级，以及所有更上层的父级
        return key === targetParentIndex || keys.indexOf(key) < keys.indexOf(targetParentIndex)
      })
      openIndices.value = newKeys
    } else {
      openIndices.value = keys
    }
  } else {
    // 非手风琴模式，直接赋值
    openIndices.value.push(...keys)
    // 进行去重
    openIndices.value = getUniqueIndices()
  }
}

// 处理菜单的 展开/收起
const handleToggle = (index) => {
  const isOpen = openIndices.value.includes(index)

  if (realAccordion.value) {
    // 手风琴模式：如果点击的是已打开的菜单，则关闭它；否则，关闭同级其他菜单并打开它
    const menuItem = findMenuItem(props.menuData, index)
    if (menuItem && menuItem.children) {
      //const siblings = props.menuData.find(item => item.children?.includes(menuItem))?.children || []
      const siblings = findSiblings(props.menuData, menuItem) || []
      const siblingIndices = siblings.map(s => s.index)

      // 关闭所有的同级菜单
      openIndices.value = openIndices.value.filter(i => !siblingIndices.includes(i))

      // 如果不是已打开状态，则打开它
      if (!isOpen) {
        openIndices.value.push(index)
      }
    }
  } else {
    // 非手风琴模式，直接切换
    if (isOpen) {
      openIndices.value = openIndices.value.filter(i => i !== index)
    } else {
      openIndices.value.push(index)
      // 进行去重
      openIndices.value = getUniqueIndices()
    }
  }
}

// 折叠时，关闭展开, 不折叠，重新计算展开
watch(() => props.isCollapse, (nv) => {
  if (nv) {
    openIndices.value = []
  } else {
    updateOpenIndices()
  }
})

// 监听 activeIndex的变化，一旦变化，自动重新计算展开项
watch(() => props.activeIndex, () => {
  updateOpenIndices()
}, { immediate: true })

</script>

<style scoped>
.my-menu {
  background-color: #fff;
}

.my-menu ul {
  padding: 0;
  margin: 0;
}

/* --- 纵向模式 (默认) --- */
.is-vertical {
  width: 240px;
  /*border-right: 1px solid #e4e4e4;*/
}

.is-vertical .menu-list {
  display: flex;
  flex-direction: column;
}

/* 折叠时的宽度处理 */
.is-vertical.is-collapse {
  width: 64px;

  li {
    width: 64px;
  }
}

/* --- 横向模式 --- */
.is-horizontal {
  width: 100%;
  /* 底部边框 */
  /* 如果是折叠的横向菜单，通常只保留 logo 或变成汉堡菜单，这里暂不处理极度折叠情况 */
  /*border-bottom: 1px solid #e4e4e4; */
}

.is-horizontal .menu-list {
  display: flex;
  flex-direction: row;
  /* 核心：横向排列 */
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
