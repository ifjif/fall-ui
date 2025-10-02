<template>
  <div :class="[ns.b()]">
    <slot />
  </div>
</template>
<script>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('checkbox-group')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@ui-library/hooks'
import { provide } from 'vue';
import { CHECKBOX_GROUP_KEY } from '../contants'
const ns = useNamespace('checkbox-group')

const groupModel = defineModel({ type: Array, default: () => [] })
const emit = defineEmits(['change'])

const changeEvent = (value) => {
  groupModel.value = value
  emit('change', value)
}
provide(CHECKBOX_GROUP_KEY, { groupModel, changeEvent })

</script>
