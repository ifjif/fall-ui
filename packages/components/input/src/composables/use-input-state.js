import { ref, shallowRef, computed } from 'vue'
import { AEyeClose, AEye, ACloseCircle as clearIcon } from '@ui-library/icons'
import { useStyle } from '@ui-library/hooks'
function useInputState(props, slots, modelValue) {
  const uStyle = useStyle()
  const _ref = shallowRef(null)
  const viewPassword = ref(false)
  const inputWidth = computed(() => {
    return uStyle.width(props.width)
  })
  const textLength = computed(() => {
    return modelValue.value ? modelValue.value.length : 0
  })
  const showCount = computed(() => {
    return props.maxlength && props.count
  })
  const isPrefix = computed(() => {
    return props.prefix || props.prefixIcon
  })
  const isSuffix = computed(() => {
    return props.suffix || props.suffixIcon || props.showPassword || props.clear || showCount.value
  })
  const isPrepend = computed(() => {
    return props.prepend || slots.prepend
  })
  const isAppend = computed(() => {
    return props.append || slots.append
  })
  const passwordIcon = computed(() => {
    if (!props.showPassword) return
    return viewPassword.value ? AEye : AEyeClose
  })
  const typeControl = computed(() => {
    if (props.showPassword && !viewPassword.value) return 'password'
    if (props.showPassword && !!viewPassword.value) return 'text'
    return props.type
  })

  return {
    _ref,
    isPrefix,
    isSuffix,
    isPrepend,
    isAppend,
    passwordIcon,
    clearIcon,
    typeControl,
    viewPassword,
    textLength,
    showCount,
    inputWidth
  }

}

export { useInputState }
