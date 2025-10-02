<template>
  <section :class="[ns.b()]">
    <slot />
  </section>
</template>
<script>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('main')
export default {
  name: ns.b(),
}
</script>
<script setup>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('main')
</script>
