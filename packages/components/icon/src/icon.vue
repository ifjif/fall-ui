<template>
  <i :class="[ns.b()]" :style="[color, fontSize]">
    <slot />
  </i>
</template>
<script>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('icon')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useStyle } from '@ui-library/hooks'
import { computed } from 'vue'
import { useNamespace } from '@ui-library/hooks'
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

</script>
