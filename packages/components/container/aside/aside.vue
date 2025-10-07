<template>
  <section :class="[ns.b()]" :style="[widthStyle]">
    <slot />
  </section>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('aside')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useStyle } from '@fall-ui/hooks'
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('aside')

const sStyle = useStyle()

const props = defineProps({
  width: [String, Number]
})

const widthStyle = sStyle.width(props.width)
</script>
