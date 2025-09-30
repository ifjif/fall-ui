<template>
  <section :class="[ns.b()]" :style="[widthStyle]">
    <slot />
  </section>
</template>

<script setup>
import { useNamespace, useStyle } from '@ui-library/hooks'
const ns = useNamespace('aside')

const sStyle = useStyle()

const props = defineProps({
  width: [String, Number]
})

const widthStyle = sStyle.width(props.width)
defineOptions({
  name: 'a-aside'
})
</script>
