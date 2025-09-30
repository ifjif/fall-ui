<template>
  <section :class="[ns.b()]" :style="[heightStyle]">
    <slot />
  </section>
</template>

<script setup>
import { useNamespace, useStyle } from '@ui-library/hooks'
const ns = useNamespace('header')

const sStyle = useStyle()

const props = defineProps({
  height: [String, Number]
})

const heightStyle = sStyle.height(props.height)
defineOptions({
  name: 'a-header'
})
</script>
