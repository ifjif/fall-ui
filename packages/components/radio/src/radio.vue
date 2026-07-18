<template>
  <component :style="radioStyle" @click="clickEvent" :is="tag" :class="[ns.b(), ns.m(type), ns.is('selected', isSelected),
  ns.is('disabled', disabled || (!isSelected && _loading)), ns.is('loading', _loading && isSelected),
    , ns.m('size', _size)
  ]">
    <span :class="[ns.e('inner')]">
      <input @change="changeEvent" @click.stop :disabled="disabled || _loading" v-model="model" :value="value"
        type="radio" :class="[ns.e('input')]" />
      <FlIcon :class="ns.is('loading-transition', _loading)">
        <FlLoading v-if="_loading" />
        <FlCheck v-else v-show="isSelected" />
      </FlIcon>
    </span>
    <span :class="[ns.e('label')]">{{ label }}</span>
  </component>
</template>
<script>
import { useNamespace } from "@fall-ui/hooks"
const ns = useNamespace('radio')

export default {
  name: ns.b()
}
</script>
<script setup>
import { FlIcon } from '@fall-ui/components'
import { FlCheck, FlLoading } from '@fall-ui/icons';
import { useRadio } from './composables/use-radio'
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('radio')

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
  beforeChange: Function,
  size: String,
  scale: [String, Number],
  styles: Object,
})
const emit = defineEmits(['change'])


const {
  model,
  isSelected,
  _loading,
  _size,
  changeEvent,
  clickEvent,
  radioStyle,
} = useRadio(props, emit, modelValue)
</script>
