<template>
  <div :style="styles"
    :class="[ns.b(), ns.m('type', type), ns.m('position', tabPosition), ns.is('only-header', onlyHeader)]">
    <!-- 头部导航 -->
    <div :class="[ns.e('header'), ns.is('add', type === 'card' && addable)]">
      <!-- 增加按钮, card且addable -->
      <span v-if="type === 'card' && addable" :class="[ns.e('new-btn')]" @click="handleAdd">
        <i>+</i>
      </span>
      <div :class="[ns.e('nav-wrapper')]">
        <!-- 活跃线 card | border-car不显示-->
        <div v-if="!(['card', 'border-car'].includes(type))" :class="[ns.e('active-bar')]" :style="barStyle">
        </div>
        <!-- 标签列表 -->
        <FlScrollBar :wheel="wheel">
          <div :class="[ns.e('nav')]" ref="navRef">
            <div v-for="pane in panes" :class="[ns.e('nav-item'), ns.is('active', pane.name === activeName),
            ns.is('disabled', pane.disabled)
            ]" @click="toggleTab(pane)">
              {{ pane.label }}
              <!-- 关闭按钮 -->
              <span v-if="pane.closable" :class="[ns.e('close')]" @click.stop="handleRemove(pane.name)">
                ×
              </span>
            </div>
          </div>
        </FlScrollBar>
      </div>
    </div>

    <div :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('tabs')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { useTabs } from './composables/use-tabs';
import { Root_Tabs } from '../constants.js'
import { provide, watch, nextTick } from 'vue'
import { FlScrollBar } from '@fall-ui/components';

const ns = useNamespace('tabs')

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    validator(t) {
      return !t || ['card', 'border-card'].includes(t)
    },
    default: ''
  },
  addable: { // 是否可新增
    type: Boolean,
    default: false
  },
  tabPosition: {
    type: String,
    validator(p) {
      return ['top', 'bottom', 'left', 'right'].includes(p)
    },
    default: 'top'
  },
  onlyHeader: {
    type: Boolean,
    default: false
  },
  styles: {
    type: Object
  }
})

const emit = defineEmits(['update:modelValue', 'tab-add', 'tab-remove'])

const {
  navRef,
  activeName,
  panes,
  onlyHeader2,
  wheel,
  registerPane,
  removePane,
  updateBar,
  toggleTab,
  handleAdd,
  handleRemove,
  styles,
  barStyle
} = useTabs(ns, props, emit)

watch(() => props.modelValue, () => {
  nextTick(() => {
    updateBar()
  })
})

provide(Root_Tabs, {
  activeName,
  onlyHeader2,
  registerPane,
  removePane
})
</script>
