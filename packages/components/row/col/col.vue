<template>
  <component :is="tag" :class="[ns.b(), ns.m('span', span), ns.m('offset', offset)]" :style="[gutterStyle]">
    <slot />
  </component>
</template>
<script setup>
import { useNamespace, useParent } from '@ui-library/hooks'
import { computed } from 'vue'
const ns = useNamespace('col')
const useP = useParent('row')

const props = defineProps({
  tag: {
    type: [String, Object],
    default: () => 'div'
  },
  span: Number,
  offset: Number
})

const gutterStyle = computed(() => {
  const gutter = useP.props('gutter')
  const value = gutter ? gutter / 2 + 'px' : null
  return value ? { paddingLeft: value, paddingRight: value } : {}
})
defineOptions({
  name: 'a-col'
})
</script>
