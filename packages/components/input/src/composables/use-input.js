import { useInputState } from "./use-input-state";
import { useInputEvent } from "./use-input-event";
import { useInputExpose } from "./use-input-expose";
import { useInputGroup } from "./use-input-group";
function useInput(props, slots, modelValue, emit) {
  const { formItemKey, isFormItem } = useInputGroup();
  const {
    _ref,
    isPrefix,
    isSuffix,
    isPrepend,
    isAppend,
    passwordIcon,
    typeControl,
    viewPassword,
    clearIcon,
    textLength,
    showCount,
    inputWidth,
  } = useInputState(props, slots, modelValue);
  const { focusExpose, blurExpose, selectExpose } = useInputExpose(_ref);
  const {
    isFocus,
    isHover,
    focusEvent,
    _blurEvent,
    viewPasswordEvent,
    clearEvent,
    inputEvent,
    mouseleaveEvent,
    mouseenterEvent,
    _changeEvent,
    keyupEvent,
    keydownEvent,
  } = useInputEvent(
    viewPassword,
    modelValue,
    emit,
    focusExpose,
    formItemKey,
    isFormItem,
  );

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
    _blurEvent,
    viewPasswordEvent,
    clearEvent,
    inputEvent,
    mouseenterEvent,
    mouseleaveEvent,
    focusExpose,
    blurExpose,
    selectExpose,
    _changeEvent,
    keyupEvent,
    keydownEvent,
  };
}

export { useInput };
