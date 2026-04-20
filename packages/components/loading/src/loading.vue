<template>
  <div v-show="loading" :class="[ns.b()]">
    <div :class="[ns.e('spinner')]"></div>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('loading')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('loading')

const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false
  }
})
</script>
