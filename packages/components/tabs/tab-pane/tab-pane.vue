<template>
  <div v-if="isShow" :class="[ns.b()]">
    <slot />
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('tab-pane')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { useTabPane } from './composables/use-tab-pane';
import { Root_Tabs } from '../constants'
import { inject, onMounted, onUnmounted } from 'vue'
const ns = useNamespace('tab-pane')

const props = defineProps({
  // tabn的 name
  name: {
    type: [String, Number],
    default: ''
  },
  // tab label，显示文字
  label: {
    type: String,
    default: ''
  },
  // 是否禁止
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否可关闭
  closable: {
    type: Boolean,
    default: false
  }
})

const rootTabs = inject(Root_Tabs)

const { isShow } = useTabPane(props, rootTabs)

onMounted(() => {
  rootTabs.registerPane({
    ...props
  })
})

onUnmounted(() => {
  rootTabs.removePane(props.name)
})
</script>
