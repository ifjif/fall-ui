<template>
  <section :class="[ns.b()]">
    <slot />
  </section>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('main')
export default {
  name: ns.b(),
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('main')
</script>
