<template>
  <i :class="[ns.b()]" :style="[color, fontSize]">
    <slot />
  </i>
</template>
<script setup>
import { useNamespace, useStyle } from '@ui-library/hooks'
import { computed } from 'vue'
const ns = useNamespace('icon')
const uStyle = useStyle()

const props = defineProps({
  color: String,
  size: [String, Number]
})

const color = computed(() => {
  return uStyle.color(props.color)
})
const fontSize = computed(() => {
  return uStyle.fontSize(props.size)
})

defineOptions({
  name: 'a-icon'
})
</script>
