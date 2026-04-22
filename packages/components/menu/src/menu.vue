<template>
  <nav :class="[ns.b(), ns.m('mode', mode), ns.is('collapse', isCollapse)]">
    <ul :class="[ns.e('menu-list')]">
      <FlMenuItem v-for="item in data" :key="item.index" :menu="item" :openIndices="openIndices"
        :active-index="activeIndex" :mode="mode" :isCollapse="isCollapse" :indent="0" @select="handleSelect"
        @toggle="handleToggle">
      </FlMenuItem>
    </ul>
  </nav>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('menu')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { useMenu } from './composables/use-menu';
import { FlMenuItem } from '..';
import { watch } from 'vue'

const ns = useNamespace('menu')

const props = defineProps({
  data: {  //[ {title, index, icon, childrenj}, ... ]
    type: Array,
    required: true
  },
  activeIndex: {
    type: String,
    default: ''
  },
  isCollapse: { // 控制折叠
    type: Boolean,
    default: false
  },
  accordion: { // 手风琴模式
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

const emit = defineEmits(['select'])

const {
  openIndices,
  handleToggle,
  handleSelect,
  updateIndecies
} = useMenu(props, emit)

watch(() => props.isCollapse, (nv) => {
  if (nv) {
    openIndices.value = []
  } else {
    updateIndecies()
  }
})

// activeIndex 变化，更新 展开列表
watch(() => props.activeIndex, () => {
  updateIndecies()
}, { immediate: true })
</script>
