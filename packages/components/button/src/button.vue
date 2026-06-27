<template>
  <button @click="clickEvent" :style="btStyle" :disabled="disabled || loading || _loading" :class="[ns.b(), ns.m(type), ns.is('round', round),
  ns.is('disabled', disabled || loading || _loading), ns.is('border', border), ns.is('dashed', dashed),
  ns.is('text', text), ns.is('link', link), ns.is('circle', circle), ns.m('size', controlSize),
  ns.is('block', block), ns.is('button-group', isGroup)
  ]">
    <template v-if="loading | _loading">
      <FlIcon :class="[ns.is('loading-transition', loading | _loading)]">
        <FlLoading />
      </FlIcon>
    </template>
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('button')
export default {
  name: ns.b()
}
</script>

<script setup>
import { FlIcon } from '@fall-ui/components'
import { useParent } from '@fall-ui/hooks'
import { FlLoading } from '@fall-ui/icons'
import { useButton } from './composables/use-button'
import { useNamespace } from '@fall-ui/hooks'
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
  beforeChange: Function,
  scale: [Number, String],
  styles: Object,
})
const emit = defineEmits(['click'])
/*
 * 自定义样式
 * styles
 * {
 *  root:{
 *    bg_color:
 *    bd_color
 *    color
 *  },
 *  hover:{
 *    bg_color:
 *    bd_color
 *    color
 *  },
 *  disabled:{
 *    bg_color:
 *    bd_color
 *    color
 *  },
 *  active:{
 *    bg_color:
 *    bd_color
 *    color
 *  }
 * }
 *
 *
 *
 */

const { _loading, controlSize, clickEvent, btStyle } = useButton(props, emit, parentSize)

</script>
