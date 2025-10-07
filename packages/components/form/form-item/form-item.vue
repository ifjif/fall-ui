<template>
  <div :class="ns.b()">
    <div :class="[ns.e('label-wrapper'), ns.is('required', _required), ns.is('colon', _colon)]"
      :style="[labelWidthStyle]">
      <label :class="[ns.e('label')]">{{ label }}</label>
    </div>
    <div :class="[ns.e('content')]">
      <slot />
      <div :class="[ns.e('tip')]">{{ tip }}</div>
    </div>
  </div>
</template>
<script>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('form-item')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@ui-library/hooks'
import { onMounted, provide } from 'vue';
import { FORM_ITEM_KEY } from '../constant.js'
import { useFormItem } from './composables/use-form-item.js'
const ns = useNamespace('form-item')

const props = defineProps({
  label: String,
  required: {
    type: Boolean,
    default: () => true
  },
  colon: {
    type: Boolean,
    default: () => true
  },
  prop: String,
  labelWidth: [String, Number]
})

const {
  _required,
  _colon,
  tip,
  labelWidthStyle,
  observer,
  initRules,
  setField,
  setInitValue
} = useFormItem(props)

provide(FORM_ITEM_KEY, { observer })

onMounted(() => {
  initRules()
  setField()
  setInitValue()
})
</script>
