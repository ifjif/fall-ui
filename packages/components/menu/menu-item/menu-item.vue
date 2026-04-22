<template>
  <li ref="submenuRef" :class="[ns.b(), ns.m('mode', mode), ns.is('collapse', isCollapse)]">
    <div @click="toggleMenu" :style="[indentStyle]" :class="[ns.e('header'), ns.is('active', isActive)]">
      <span :class="[ns.e('icon'), ns.is('collapse', isCollapse)]">{{ menu.icon }}</span>
      <span ref="titleRef" v-show="!isCollapse" :class="[ns.e('title')]">{{ menu.title }}</span>
      <span v-if="hasChildren" v-show="!isCollapse" :class="[ns.e('arrow'), ns.is('active', isOpen)]">▼</span>
    </div>

    <Teleport v-if="isCollapse" to="body">
      <ul ref="ssubmenuRef" :style="[subMenuStyle]" v-if="hasChildren" v-show="isOpen"
        :class="[subNs.b(), ns.e('submenu')]">
        <MenuItem v-for="item in menu.children" :menu="item" :active-index="activeIndex" :openIndices="openIndices"
          :indent="0" :mode="mode" @select="$emit('select', $event)" @toggle="$emit('toggle', $event)">
        </MenuItem>
      </ul>
    </Teleport>

    <template v-else>
      <ul v-if="hasChildren" v-show="isOpen" :class="[ns.e('submenu')]">
        <MenuItem v-for="item in menu.children" :menu="item" :active-index="activeIndex" :openIndices="openIndices"
          :indent="indent + 1" :mode="mode" @select="$emit('select', $event)" @toggle="$emit('toggle', $event)">
        </MenuItem>
      </ul>
    </template>
  </li>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
import MenuItem from './menu-item.vue'
const ns = useNamespace('menu-item')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useMenuItem } from './composables/use-menu-item';
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('menu-item')
const subNs = useNamespace('submenu')

const props = defineProps({
  menu: { // {title, index, icon, children}
    type: Object,
    required: true
  },
  indent: {
    type: Number,
    default: 0
  },
  activeIndex: {
    type: String,
    default: ''
  },
  openIndices: { // 需要进行展开的项
    type: Array,
    default: () => []
  },
  isCollapse: { // 控制折叠
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    validator(m) {
      return ['vertical', 'horizontal'].includes(m)
    },
    default: 'vertical'
  }
})

const emit = defineEmits(['toggle', 'select'])

const {
  submenuRef,
  ssubmenuRef,
  hasChildren,
  isOpen,
  isActive,
  toggleMenu,
  indentStyle,
  subMenuStyle,
} = useMenuItem(props, emit)


</script>
