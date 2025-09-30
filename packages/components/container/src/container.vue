<template>
  <section :class="[ns.b(), ns.is('vertical', isVertical)]">
    <slot />
  </section>
</template>

<script setup>
import { useNamespace } from '@ui-library/hooks'
import { computed, useSlots } from 'vue'
const ns = useNamespace('container')

const props = defineProps({
  directive: String
})

const slots = useSlots()

const isVertical = computed(() => {
  if (props.directive === 'vertical') return true
  if (props.directive === 'horizontal') return false

  if (slots && slots.default) {
    const slotNodes = slots.default()
    const tag = slotNodes.some(node => ['a-header', 'a-footer'].includes(node.type.name))
    return tag
  }
  return false
})

defineOptions({
  name: 'a-container'
})
</script>
