<template>
  <div :class="[ns.b()]">
    <slot />
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('button-group')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('button-group')
const props = defineProps({
  size: {
    type: String,
    validator(v) {
      return !v || ['small', 'large'].includes(v)
    }
  },
})
</script>
