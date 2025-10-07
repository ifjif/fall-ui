<template>
  <div :class="[ns.b(), ns.is('focus', isFocus), ns.m(inputType), ns.is('disalbed', disabled),
  ns.m('size', size)
  ]" :style="[inputWidth]">

    <div :class="[ns.e('wrapper')]">
      <div v-if="$slots.prefix" :class="[ns.e('fix'), ns.e('prefix')]">
        <slot name="prefix" />
      </div>
      <textarea :rows="rows" v-model="modelValue" ref="_ref" :disabled="disabled" :maxlength="maxlength"
        @input="inputEvent" @focus="focusEvent" @blur="blurEvent" @mouseenter="mouseenterEvent"
        @mouseleave="mouseleaveEvent" @change="changeEvent" @keyup="keyupEvent" @keydown="keydownEvent"
        :placeholder="placeholder" :class="[ns.e('inner')]"></textarea>
      <div v-if="isSuffix || $slots.suffixLeft || $slots.suffixRight" :class="[ns.e('fix'), ns.e('suffix')]">
        <slot name="suffixLeft" />
        <FlIcon v-if="clear" :class="[ns.e('clear-icon')]" @click="clearEvent">
          <component :is="clearIcon"></component>
        </FlIcon>
        <span v-if="showCount">{{ textLength }} / {{ maxlength }}</span>
        <slot name="suffixRight" />
      </div>
    </div>

  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('textarea')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useTextarea } from './composables/use-textarea'
import { FlIcon } from '@fall-ui/components'
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('textarea')

const props = defineProps({
  inputType: {
    type: String,
    default: () => 'primary'
  },
  placeholder: {
    type: String,
    default: () => "请输入"
  },
  disabled: Boolean,
  maxlength: [String, Number],
  size: String,
  clear: Boolean,
  count: Boolean,
  width: [String, Number],
  rows: {
    type: [String, Number],
    default: () => 4
  }
})

const modelValue = defineModel()

const emit = defineEmits(['input', 'focus', 'blur', 'mouseenter', 'mouseleave', 'change', 'keyup', 'keydown'])

const { _ref, isFocus, isHover, isSuffix,
  clearIcon, textLength, showCount, inputWidth,
  focusEvent, blurEvent, clearEvent, mouseleaveEvent, mouseenterEvent,
  changeEvent, keyupEvent, keydownEvent,
  inputEvent, focusExpose, blurExpose, selectExpose } = useTextarea(props, modelValue, emit)

defineExpose({
  ref: _ref,
  focus: focusExpose,
  blur: blurExpose,
  select: selectExpose
})
</script>
