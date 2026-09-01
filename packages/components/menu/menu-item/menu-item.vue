<template>
  <li ref="submenuRef" :style="styles" :class="[ns.b(), ns.m('mode', mode), ns.is('collapse', isCollapse)]">
    <div @click="toggleMenu" :style="[indentStyle]" :class="[ns.e('header'),
    ns.m('header-position', headerPosition), ns.is('active', isActive || childActive)]">
      <span :class="[ns.e('icon'), ns.is('collapse', isCollapse)]">
        <slot v-if="$slots.icon" name="icon" :item="menu" />
        <template v-else>
          {{ menu.icon }}
        </template>
      </span>
      <span ref="titleRef" v-show="!isCollapse" :class="[ns.e('title')]">
        <slot v-if="$slots.title" name="title" :item="menu" />
        <template v-else>
          {{ menu.title }}
        </template>
      </span>
      <span v-if="hasChildren" v-show="!isCollapse" :class="[ns.e('arrow'), ns.is('active', isOpen)]">▼</span>
    </div>

    <Teleport v-if="isCollapse" to="body">
      <ul ref="ssubmenuRef" :style="[subMenuStyle, styles]" v-if="hasChildren" v-show="isOpen" :class="[subNs.b()]">
        <FlScrollBar maxHeight="240">
          <MenuItem v-for="item in menu.children" :key="item[keyProp]" :menu="item" :active-index="activeIndex"
            :openIndices="openIndices" :styles="subStyles" :keyProp="keyProp" :headerPosition="headerPosition"
            :indent="0" :mode="mode" @select="selectChild($event)" @toggle="$emit('toggle', $event)">
          <template v-if="$slots.icon" #icon="{ item }">
            <slot name="icon" :item="item" />
          </template>

          <template v-if="$slots.title" #title="{ item }">
            <slot name="title" :item="item" />
          </template>
          </MenuItem>
        </FlScrollBar>
      </ul>
    </Teleport>

    <template v-else>
      <ul v-if="hasChildren" v-show="isOpen" :class="[ns.e('submenu')]">
        <MenuItem :styles="subStyles" v-for="item in menu.children" :key="item[keyProp]" :menu="item"
          :active-index="activeIndex" :openIndices="openIndices" :keyProp="keyProp" :headerPosition="headerPosition"
          :indent="indent + 1" :mode="mode" @select="selectChild($event)" @toggle="$emit('toggle', $event)">
        <template v-if="$slots.icon" #icon="{ item }">
          <slot name="icon" :item="item" />
        </template>

        <template v-if="$slots.title" #title="{ item }">
          <slot name="title" :item="item" />
        </template>
        </MenuItem>
      </ul>
    </template>
  </li>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
import { FlScrollBar } from '@fall-ui/components'
import MenuItem from './menu-item.vue'
const ns = useNamespace('menu-item')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useMenuItem } from './composables/use-menu-item';
import { useNamespace } from '@fall-ui/hooks';
import { computed, onUnmounted } from 'vue'
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
  activeTopIndex: {
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
  },
  styles: {
    type: Object
  },
  headerPosition: {
    type: String,
    validator(v) {
      return ['top', 'center', 'end'].includes(v)
    },
    default: 'center'
  },
  keyProp: {
    type: String,
    default: 'index'
  }
})

const emit = defineEmits(['toggle', 'select'])

const childActive = computed(() => {
  return props.activeTopIndex === props.menu[props.keyProp] && (props.isCollapse || props.mode === 'horizontal')
})
const selectChild = (e) => {
  emit('select', e)
}

const subStyles = computed(() => {
  const sub = { ...props.styles }
  const ro = { ...sub['root'] }
  if (ro) {
    delete ro['bg_color']
    sub['root'] = ro
  }
  return sub
})

const {
  submenuRef,
  ssubmenuRef,
  hasChildren,
  isOpen,
  isActive,
  toggleMenu,
  styles,
  indentStyle,
  subMenuStyle,
  updatePosition
} = useMenuItem(props, emit)

const scrollPositionUpdate = () => {
  if (isOpen.value) {
    updatePosition()
  }
}

window.addEventListener('scroll', scrollPositionUpdate, { capture: true, passive: true })

onUnmounted(() => {
  window.removeEventListener('scroll', scrollPositionUpdate)
})

</script>
