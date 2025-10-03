<template>
  <label @click="clickEvent" :class="[ns.b(), ns.m(type), ns.is('active', checked), ns.is('disabled', disabled || _loading),
  ns.is('loading', _loading && checked), ns.m('size', size)
  ]">
    <input :disabled="disabled || _loading" @click.stop @change="changeEvent" v-model="checked"
      :class="[ns.e('checkbox')]" type="checkbox" />
    <span :class="[ns.e('circle'), ns.is('checked', checked)]">
      <FlIcon v-if="centerIcon || _loading" :class="[ns.is('loading-transition', _loading)]">
        <FlLoading v-if="_loading" />
        <template v-else>
          <component v-if="checked" :is="checkedIcon"></component>
          <component v-else :is="uncheckedIcon"></component>
        </template>
      </FlIcon>
    </span>
    <span v-if="!centerIcon" :class="ns.e('inner')">
      <span :class="[ns.e('label')]">开</span>
      <span :class="[ns.e('label')]">关</span>
    </span>
  </label>
</template>
<script>
import { useNamespace } from '@ui-library/hooks';
const ns = useNamespace('switch')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@ui-library/hooks';
import { FlIcon } from '@ui-library/components'
import { FlLoading } from '@ui-library/icons';
import { useSwitch } from './composables/use-switch'
const ns = useNamespace('switch')

const props = defineProps({
  type: {
    type: String,
    default: () => 'primary'
  },
  disabled: Boolean,
  checkedIcon: [String, Object],
  uncheckedIcon: [String, Object],
  loading: Boolean,
  beforeChange: Function,
  size: String
})

const modelValue = defineModel({ type: Boolean })
const emit = defineEmits(['change'])

const { checked, centerIcon, _loading, clickEvent, changeEvent } = useSwitch(props, emit, modelValue)
</script>
