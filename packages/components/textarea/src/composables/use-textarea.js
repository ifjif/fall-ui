import { useTextareaState } from "./use-textarea-state";
import { useTextareaEvent } from "./use-textarea-event";
import { useTextareaExpose } from "./use-textarea-expose";
function useTextarea(props, modelValue, emit) {
  const { _ref, isSuffix,
    clearIcon, textLength, showCount, inputWidth
  } = useTextareaState(props, modelValue)
  const { focusExpose, blurExpose, selectExpose } = useTextareaExpose(_ref)
  const { isFocus, isHover, focusEvent, blurEvent,
    clearEvent, inputEvent, mouseleaveEvent, mouseenterEvent,
    changeEvent, keyupEvent, keydownEvent
  } = useTextareaEvent(modelValue, emit, focusExpose)

  return {
    _ref,
    isFocus,
    isHover,
    isSuffix,
    clearIcon,
    textLength,
    showCount,
    inputWidth,
    focusEvent,
    blurEvent,
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

export { useTextarea }
