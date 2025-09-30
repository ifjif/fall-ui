<template>
  <div :class="[ns.b()]">
    <slot />
  </div>
</template>
<script setup>
import { useNamespace } from '@ui-library/hooks';
const ns = useNamespace('button-group')

const props = defineProps({
  size: String
})

defineOptions({
  name: 'a-button-group'
})
</script>
