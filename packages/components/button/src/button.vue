<template>
  <button @click="clickEvent" :disabled="disabled || loading || _loading" :class="[ns.b(), ns.m(type), ns.is('round', round),
  ns.is('disabled', disabled || loading || _loading), ns.is('border', border), ns.is('dashed', dashed),
  ns.is('text', text), ns.is('link', link), ns.is('circle', circle), ns.m('size', controlSize),
  ns.is('block', block), ns.is('button-group', isGroup)
  ]">
    <template v-if="loading | _loading">
      <AIcon :class="[ns.is('loading-transition', loading | _loading)]">
        <ALoading />
      </AIcon>
    </template>
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>
<script>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('button')
export default {
  name: ns.b()
}
</script>

<script setup>
import { AIcon } from '@ui-library/components'
import { useParent } from '@ui-library/hooks'
import { ALoading } from '@ui-library/icons'
import { useButton } from './composables/use-button'
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('button')
const parent = useParent('button-group')
const isGroup = parent.group()
const parentSize = parent.props('size')

const props = defineProps({
  type: String,
  round: Boolean,
  disabled: Boolean,
  border: Boolean,
  dashed: Boolean,
  text: Boolean,
  link: Boolean,
  circle: Boolean,
  block: Boolean,
  loading: Boolean,
  size: String,
  beforeChange: Function
})
const emit = defineEmits(['click'])

const { _loading, controlSize, clickEvent } = useButton(props, emit, parentSize)

</script>
