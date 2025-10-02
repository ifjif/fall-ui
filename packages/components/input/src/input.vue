<template>
  <div :class="[ns.b(), ns.is('focus', isFocus), ns.m(inputType), ns.is('disalbed', disabled),
  ns.is('round', round), ns.m('size', size)
  ]" :style="[inputWidth]">
    <div v-if="isPrepend" :class="[(prepend) && ns.e('pend'), ns.e('prepend'), ns.e('b-pend')]">
      <slot name="prepend" />
      <div v-if="prepend">
        {{ prepend }}
      </div>
    </div>

    <div :class="[ns.e('wrapper'), ns.is('prepend', isPrepend), ns.is('append', isAppend)]">
      <div v-if="isPrefix" :class="[ns.e('fix'), ns.e('prefix')]">
        <span v-if="prefix">{{ prefix }}</span>
        <AIcon v-if="prefixIcon">
          <component :is="prefixIcon"></component>
        </AIcon>
      </div>
      <input v-model="modelValue" ref="_ref" :type="typeControl" :disabled="disabled" :maxlength="maxlength"
        @input="inputEvent" @focus="focusEvent" @blur="blurEvent" @mouseenter="mouseenterEvent"
        @mouseleave="mouseleaveEvent" @change="changeEvent" @keyup="keyupEvent" @keydown="keydownEvent"
        :placeholder="placeholder" :class="[ns.e('inner')]" />
      <div v-if="isSuffix" :class="[ns.e('fix'), ns.e('suffix')]">
        <template v-if="!showPassword || !clear">
          <span v-if="suffix">{{ suffix }}</span>
          <AIcon v-if="suffixIcon">
            <component :is="suffixIcon"></component>
          </AIcon>
        </template>
        <AIcon v-if="showPassword" :class="[ns.e('password-icon')]" @click="viewPasswordEvent">
          <component :is="passwordIcon"></component>
        </AIcon>
        <AIcon v-if="clear" :class="[ns.e('clear-icon')]" @click="clearEvent">
          <component :is="clearIcon"></component>
        </AIcon>
        <span v-if="showCount">{{ textLength }} / {{ maxlength }}</span>
      </div>
    </div>

    <div v-if="isAppend" :class="[(append) && ns.e('pend'), ns.e('append'), ns.e('b-pend')]">
      <slot name="append" />
      <div v-if="append">
        {{ append }}
      </div>
    </div>
  </div>
</template>
<script>
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('input')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useInput } from './composables/use-input'
import { AIcon } from '@ui-library/components'
import { useSlots } from 'vue'
import { useNamespace } from '@ui-library/hooks'
const ns = useNamespace('input')

const props = defineProps({
  type: {
    type: String,
    default: () => 'text'
  },
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
  round: Boolean,
  size: String,
  prefix: String,
  suffix: String,
  prefixIcon: [String, Object],
  suffixIcon: [String, Object],
  prepend: String,
  append: String,
  showPassword: Boolean,
  clear: Boolean,
  count: Boolean,
  width: [String, Number]
})

const modelValue = defineModel()

const slots = useSlots()
const emit = defineEmits(['input', 'focus', 'blur', 'mouseenter', 'mouseleave', 'change', 'keyup', 'keydown'])

const { _ref, isFocus, isHover, isPrefix, isSuffix, isPrepend, isAppend,
  passwordIcon, clearIcon, typeControl, textLength, showCount, inputWidth,
  focusEvent, blurEvent, viewPasswordEvent, clearEvent, mouseleaveEvent, mouseenterEvent,
  changeEvent, keyupEvent, keydownEvent,
  inputEvent, focusExpose, blurExpose, selectExpose } = useInput(props, slots, modelValue, emit)

defineExpose({
  ref: _ref,
  focus: focusExpose,
  blur: blurExpose,
  select: selectExpose
})

</script>
