<template>
  <section :class="[ns.b()]" :style="[heightStyle]">
    <slot />
  </section>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('header')
export default {
  name: ns.b()
}
</script>

<script setup>
import { useStyle } from '@fall-ui/hooks'
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('header')

const sStyle = useStyle()

const props = defineProps({
  height: [String, Number]
})

const heightStyle = sStyle.height(props.height)
</script>
