<template>
  <component :is="tag" :class="[ns.b(), ns.m('justify', justify)]" :style="[rowGapStyle, marginStyle]">
    <slot />
  </component>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('row')
export default {
  name: ns.b()
}
</script>
<script setup>
import { computed } from 'vue'
import { useNamespace } from '@fall-ui/hooks'
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
</script>
