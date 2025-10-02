<template>
  <div :class="[ns.b()]">
    <slot />
  </div>
</template>
<script>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('button-group')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('button-group')
const props = defineProps({
  size: String
})
</script>
