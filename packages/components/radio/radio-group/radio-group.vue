<template>
  <div :class="[ns.b()]">
    <slot />
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('radio-group')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks'
import { provide, toRefs } from 'vue';
import { RADIO_GROUP_KEY } from '../contants'
const ns = useNamespace('checkbox-group')

const props = defineProps({
  size: String
})

const groupModel = defineModel({ type: [String, Boolean, Number], default: () => '' })
const emit = defineEmits(['change'])

const changeEvent = (value) => {
  groupModel.value = value
  emit('change', value)
}

provide(RADIO_GROUP_KEY, { ...toRefs(props), groupModel, changeEvent })

</script>
