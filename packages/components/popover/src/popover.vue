<template>
  <component :is="tag" :class="props.class" v-if="$slots.reference" v-fl-tool-tip="popoverProps">
    <slot name="reference" />
  </component>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('popover')
export default {
  name: ns.b(),
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { computed } from 'vue'
import { VFlToolTip } from '@fall-ui/directives'

const ns = useNamespace('popover')

const props = defineProps({
  class: {
    type: String
  },
  tag: {
    type: String,
    default: () => 'div'
  },
  title: {
    type: String,
    default: () => ''
  },
  showArrow: { type: Boolean, default: () => true },
  trigger: { type: String, default: () => 'click' }, // hover | click
  placement: {
    type: String,
    validator(position) {
      return ['top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end'
      ].includes(position)
    }
  }
})

const slots = defineSlots()

const popoverProps = computed(() => {
  return {
    title: props.title,
    showArrow: props.showArrow,
    slots: { default: slots.default },
    trigger: props.trigger,
    placement: props.placement
  }
})
</script>
