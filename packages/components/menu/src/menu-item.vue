<template>
  <!-- 情况一：有子菜单，渲染为分组 -->
  <li v-if="menu.children && menu.children.length > 0" class="my-submenu" :class="[`is-${mode}`]">
    <div class="submenu-title" @click="toggleSubmenu" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <!-- 图标始终显示 -->
      <span class="icon">{{ menu.icon }}</span>
      <!-- 文字：折叠时隐藏 -->
      <span class="title" v-show="!isCollapse">{{ menu.title }}</span>
      <!-- 箭头：折叠时隐藏 -->
      <span class="arrow" v-show="!isCollapse" :class="{ 'is-active': isOpen }">▼</span>
    </div>

    <!-- 递归调用自己来渲染子菜单 -->
    <ul @mouseenter="subMouseEnter" @mouseleave="subMouseLeave" v-show="isOpen" class="submenu-list">
      <fl-menu-item v-for="child in menu.children" :key="child.index" :menu="child" :active-index="activeIndex"
        :open-indices="openIndices" :accordion="accordion" :is-collapse="isCollapse" :mode="mode"
        @select="$emit('select', $event)" @toggle="$emit('toggle', $event)" />
    </ul>
  </li>

  <!-- 情况二：没有子菜单，渲染为普通菜单项-->
  <li v-else class="my-menu-item" :class="[`is-${mode}`]">
    <a href="#" @click.prevent="handleClick(menu.index)" :class="{ 'is-active': isActive }">
      <span class="icon">{{ menu.icon }}</span>
      <span class="title" v-show="!isCollapse">{{ menu.title }}</span>
    </a>
  </li>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('menu-item')
export default {
  name: ns.b()
}
</script>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  menu: {
    type: Object,
    required: true
  },
  activeIndex: { type: String, default: '' }, // 接受外部传入的激活索引
  openIndices: { type: Array, default: () => [] }, // 需要进行的展开项
  accordion: { type: Boolean, default: false }, // 手风琴模式
  isCollapse: { type: Boolean, default: false }, // 控制折叠
  mode: {
    type: String,
    validator(m) {
      return ['vertical', 'horizontal'].includes(m)
    }
    , default: 'vertical'
  }, // 模式
})

const emit = defineEmits(['select', 'toggle'])

// 判断是否激活
const isActive = computed(() => props.activeIndex === props.menu.index)

// 控制子菜单的展开/收起状态
const isOpen = computed(() => props.openIndices.includes(props.menu.index))
// 是否有孩子
const hasChildren = computed(() => props.menu.children && props.menu.children.length > 0)

// 切换子菜单的可见性
const toggleSubmenu = () => {
  if (hasChildren.value) {
    if (props.mode === 'horizontal') return // 横向模式点击通常不触发 toggle,而是靠hover
  }
  emit('toggle', props.menu.index)
}

const handleMouseEnter = () => {
  if (props.mode === 'horizontal' && hasChildren.value) {
    emit('toggle', props.menu.index)
  }
}

let timer = null
const handleMouseLeave = () => {
  if (timer) return
  timer = setTimeout(() => {
    if (props.mode === 'horizontal' && hasChildren.value) {
      emit('toggle', props.menu.index)
    }
    timer = null
  }, 300)
}

const subMouseEnter = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}
const subMouseLeave = () => {
  if (timer) return
  timer = setTimeout(() => {
    if (props.mode === 'horizontal' && hasChildren.value) {
      emit('toggle', props.menu.index)
    }
    timer = null
  }, 300)
}

// 点击叶子节点时，向父组件发送事件
const handleClick = (index) => {
  emit('select', index)
}
</script>
<style scoped>
a,
a:link,
a:visited,
a:hover,
a:active,
a:focus {
  text-decoration: none;
}


/* 基础样式 */
.my-submenu,
.my-menu-item {
  position: relative;
  list-style: none;
}

.submenu-title,
.my-menu-item a {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s;
}

.submenu-title:hover,
.my-menu-item a:hover {
  background-color: #f5f7fa;
  color: #409eff;
}

.icon {
  margin-right: 10px;
  width: 24px;
  text-align: center;
}

/* 文字样式 */
.title {
  flex: 1;
  /* 占据剩余空间 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 文字过长显示省略号 */
}

.arrow {
  margin-left: auto;
  font-size: 12px;
  transform: rotate(-90deg);
  transition: transform 0.3s;
}

.arrow.is-active {
  transform: rotate(0deg);
}

/* --- 折叠状态下的特殊样式 --- */

/* 当父级容器折叠时，让菜单项居中 */
.my-menu.is-collapse .submenu-title,
.my-menu.is-collapse .my-menu-item a {
  justify-content: center;
  /* 内容居中 */
  padding: 12px 0;
  /* 调整内边距 */
}

.my-menu.is-collapse .icon {
  margin-right: 0;
  /* 移除右边距 */
}

/* 子菜单列表样式 */
.submenu-list {
  padding-left: 20px;
  /* 产生缩进效果 */
  background-color: #fafafa;
}

/* 样式微调，使用 .is-active 类来控制高亮 */
.is-vertical.my-menu-item a.is-active {
  background-color: #ecf5ff;
  color: #409eff;
  border-right: 2px solid #409eff;
}

.is-horizontal.my-menu-item a.is-active {
  background-color: #ecf5ff;
  color: #409eff;
  border-bottom: 2px solid #409eff;
}

.is-vertical.my-submenu .submenu-title {
  border-right: 2px solid #e4e4e4;
}

.is-vertical.my-menu-item a {
  border-right: 2px solid #e4e4e4;
}


.is-horizontal.my-submenu .submenu-title {
  /*border-bottom: 2px solid #e4e4e4; */
  border-bottom: 2px solid transparent;
}

.is-horizontal.my-menu-item a {
  /*border-bottom: 2px solid #e4e4e4; */
  border-bottom: 2px solid transparent;
}

/* --- 纵向样式 --- */
.is-vertical {
  flex-direction: column;
}

.is-vertical .submenu-list {
  /* 纵向：在文档流中推挤下方 */
  list-style: none;
  padding-left: 20px;
  background: #f0f0f0;
}

/* --- 横向样式 --- */
.is-horizontal {
  position: relative;
  flex-direction: row;
  height: 100%;
  /* 占满父容器高度 */
}

/* 横向模式下的子菜单：绝对定位，浮层效果 */
.is-horizontal .submenu-list {
  position: absolute;
  top: 100%;
  /* 紧贴父元素底部 */
  left: 0;
  min-width: 120px;
  background: #fff;
  border: 1px solid #e4e4e4;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
  z-index: 1000;
  list-style: none;
}

/* 横向模式下，子菜单里的项也是纵向排列的 */
.is-horizontal .submenu-list .my-submenu .submenu-list {
  left: 100%;
  margin-left: 4px;
}
</style>
