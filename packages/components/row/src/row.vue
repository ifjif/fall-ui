<template>
  <component :is="tag" :class="[ns.b(), ns.m('justify', justify)]" :style="[rowGapStyle, marginStyle]">
    <slot />
  </component>
</template>
<script setup>
import { useNamespace } from '@ui-library/hooks'
import { computed } from 'vue'
const ns = useNamespace('row')

const props = defineProps({
  tag: {
    type: [String, Object],
    default: () => 'div'
  },
  gap: {
    type: [String, Number],
    default: () => 0
  },
  gutter: {
    type: Number,
    default: () => 0
  },
  justify: String
})

const marginStyle = computed(() => {
  const value = props.gutter ? -props.gutter / 2 + 'px' : null
  return value ? { marginLeft: value, marginRight: value } : {}
})

const rowGapStyle = computed(() => {
  return props.gap ? { 'row-gap': `${props.gap}px` } : {}
})

defineOptions({
  name: 'a-row'
})
</script>
