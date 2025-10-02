<template>
  <section :class="[ns.b(), ns.is('vertical', isVertical)]">
    <slot />
  </section>
</template>
<script>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('container')
export default {
  name: ns.b()
}
</script>

<script setup>
import { computed, useSlots } from 'vue'
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('container')
const name2Header = useNamespace('header').b()
const name2Footer = useNamespace('footer').b()

const props = defineProps({
  directive: String
})

const slots = useSlots()

const isVertical = computed(() => {
  if (props.directive === 'vertical') return true
  if (props.directive === 'horizontal') return false

  if (slots && slots.default) {
    const slotNodes = slots.default()
    const tag = slotNodes.some(node => [name2Header, name2Footer].includes(node.type.name))
    return tag
  }
  return false
})

</script>
