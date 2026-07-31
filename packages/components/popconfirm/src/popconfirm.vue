<template>
  <component :is="tag" :class="props.class" v-if="$slots.reference" v-fl-tool-tip="popoverProps">
    <slot name="reference" />
  </component>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('popconfirm')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { computed } from 'vue'
import { VFlToolTip } from '@fall-ui/directives'

const ns = useNamespace('popconfirm')

const props = defineProps({
  class: {
    type: String
  },
  tag: {
    type: String,
    default: () => 'div'
  },
  trigger: {
    type: String,
    default: () => 'click',
    validator(v) {
      return ['click', 'hover'].includes(v)
    }
  },
  padding: { type: Number, default: () => 12 },
  showArrow: { type: Boolean, default: () => true },
  toBody: {
    type: Boolean,
    default: () => true
  },
  placement: {
    type: String,
    validator(position) {
      return ['top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end'
      ].includes(position)
    },
    default: () => 'top'
  }
})

const emit = defineEmits(['cancel', 'confirm'])

const slots = defineSlots()

const popoverProps = computed(() => {
  return {
    trigger: props.trigger,
    footer: true,
    showArrow: props.showArrow,
    padding: props.padding,
    slots: { default: slots.default },
    placement: props.placement,
    toBody: props.toBody,
    onCancel: () => {
      emit('cancel')
    },
    onConfirm: () => {
      emit('confirm')
    }
  }
})
</script>
