<template>
  <li :class="[ns.b()]"></li>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('tree-node')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('tree-node')
</script>
