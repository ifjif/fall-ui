<template>
  <component @click="clickEvent" :is="tag" :class="[ns.b(), ns.m(type), ns.is('selected', isSelected || indeterminate),
  ns.is('disabled', disabled || (!isSelected && _loading)), ns.is('loading', _loading && isSelected),
  ns.is('indeterminate', indeterminate)
  ]">
    <span :class="[ns.e('inner')]">
      <input @change="changeEvent" @click.stop :disabled="disabled || _loading" v-model="model" :value="value"
        type="checkbox" :class="[ns.e('input')]" />
      <i v-if="indeterminate" :class="[ns.e('indeterminate')]"></i>
      <AIcon v-else :class="ns.is('loading-transition', _loading)">
        <ALoading v-if="_loading" />
        <ACheck v-else v-show="isSelected" />
      </AIcon>
    </span>
    <span :class="[ns.e('label')]">{{ label }}</span>
  </component>
</template>
<script>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('checkbox')
export default {
  name: ns.b()
}
</script>
<script setup>
import { AIcon } from '@ui-library/components'
import { ACheck, ALoading } from '@ui-library/icons';
import { useCheckbox } from './composables/use-checkbox'
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('checkbox')

const modelValue = defineModel({ type: [String, Number, Boolean], default: () => '' })
const props = defineProps({
  tag: {
    type: [String, Object],
    default: () => 'label'
  },
  type: {
    type: String,
    default: () => 'primary'
  },
  label: [String, Number],
  value: [String, Number, Boolean],
  disabled: Boolean,
  loading: Boolean,
  indeterminate: Boolean,
  beforeChange: Function
})
const emit = defineEmits(['change'])


const { model, isSelected, _loading, changeEvent, clickEvent } = useCheckbox(props, emit, modelValue)

</script>
