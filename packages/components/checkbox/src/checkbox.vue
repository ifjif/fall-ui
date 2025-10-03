<template>
  <component @click="clickEvent" :is="tag" :class="[ns.b(), ns.m(type), ns.is('selected', isSelected || indeterminate),
  ns.is('disabled', disabled || (!isSelected && _loading)), ns.is('loading', _loading && isSelected),
  ns.is('indeterminate', indeterminate), ns.m('size', _size)
  ]">
    <span :class="[ns.e('inner')]">
      <input @change="changeEvent" @click.stop :disabled="disabled || _loading" v-model="model" :value="value"
        type="checkbox" :class="[ns.e('input')]" />
      <i v-if="indeterminate" :class="[ns.e('indeterminate')]"></i>
      <FlIcon v-else :class="ns.is('loading-transition', _loading)">
        <FlLoading v-if="_loading" />
        <FlCheck v-else v-show="isSelected" />
      </FlIcon>
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
import { FlIcon } from '@ui-library/components'
import { FlCheck, FlLoading } from '@ui-library/icons';
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
  beforeChange: Function,
  size: String
})
const emit = defineEmits(['change'])


const { model, isSelected, _loading, _size, changeEvent, clickEvent } = useCheckbox(props, emit, modelValue)

</script>
