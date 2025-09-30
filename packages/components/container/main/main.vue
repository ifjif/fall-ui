<template>
  <section :class="[ns.b()]">
    <slot />
  </section>
</template>

<script setup>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('main')

defineOptions({
  name: 'a-main'
})
</script>
