import { useInputState } from "./use-input-state";
import { useInputEvent } from "./use-input-event";
import { useInputExpose } from "./use-input-expose";
function useInput(props, slots, modelValue, emit) {
  const { _ref, isPrefix, isSuffix, isPrepend, isAppend, passwordIcon, typeControl,
    viewPassword, clearIcon, textLength, showCount, inputWidth
  } = useInputState(props, slots, modelValue)
  const { focusExpose, blurExpose, selectExpose } = useInputExpose(_ref)
  const { isFocus, isHover, focusEvent, blurEvent, viewPasswordEvent,
    clearEvent, inputEvent, mouseleaveEvent, mouseenterEvent,
    changeEvent, keyupEvent, keydownEvent
  } = useInputEvent(viewPassword, modelValue, emit, focusExpose)

  return {
    _ref,
    isFocus,
    isHover,
    isPrefix,
    isSuffix,
    isPrepend,
    isAppend,
    passwordIcon,
    clearIcon,
    typeControl,
    textLength,
    showCount,
    inputWidth,
    focusEvent,
    blurEvent,
    viewPasswordEvent,
    clearEvent,
    inputEvent,
    mouseenterEvent,
    mouseleaveEvent,
    focusExpose,
    blurExpose,
    selectExpose,
    changeEvent,
    keyupEvent,
    keydownEvent
  }
}

export { useInput }
