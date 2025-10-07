<template>
  <div :class="[ns.b()]">
    <slot />
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
import { onMounted, provide, toRefs } from 'vue';
const ns = useNamespace('form')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks'
import { FORM_KEY } from '../constant.js'
const ns = useNamespace('form')

const props = defineProps({
  model: {
    type: Object,
    default: () => { }
  },
  rules: {
    type: Object,
    default: () => { }
  }
})
const fields = []

const putFields = (context) => { fields.push(context) }

provide(FORM_KEY, { ...toRefs(props), putFields })

const validate = async () => {
  let errors = []
  for (const field of fields) {
    try {
      await field.validate()
    } catch (e) {
      errors.push(e)
    }
  }

  if (errors.length === 0) return true
  return Promise.reject(errors)
}
const reset = () => {
  for (const field of fields) {
    field.restField()
  }
}

defineExpose({
  validate,
  reset
})
</script>
