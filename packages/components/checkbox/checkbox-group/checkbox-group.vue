<template>
  <div :class="[ns.b()]">
    <slot />
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('checkbox-group')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks'
import { provide, toRefs } from 'vue';
import { CHECKBOX_GROUP_KEY } from '../contants'
const ns = useNamespace('checkbox-group')

const props = defineProps({
  size: String
})

const groupModel = defineModel({ type: Array, default: () => [] })
const emit = defineEmits(['change'])

const changeEvent = (value) => {
  groupModel.value = value
  emit('change', value)
}

provide(CHECKBOX_GROUP_KEY, { ...toRefs(props), groupModel, changeEvent })

</script>
