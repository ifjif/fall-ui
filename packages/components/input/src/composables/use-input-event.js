import { useEvent } from "@fall-ui/hooks";
function useInputEvent(
  viewPassword,
  modelValue,
  emit,
  focusExpose,
  formItemKey,
  isFormItem,
) {
  const {
    isFocus,
    isHover,
    focusEvent,
    blurEvent,
    mouseleaveEvent,
    mouseenterEvent,
    changeEvent,
    keyupEvent,
    keydownEvent,
  } = useEvent();

  const _blurEvent = () => {
    blurEvent();
    if (isFormItem) formItemKey.observer("blur");
  };
  const _changeEvent = () => {
    changeEvent();
    if (isFormItem) formItemKey.observer("change");
  };
  const viewPasswordEvent = () => {
    viewPassword.value = !viewPassword.value;
  };
  const inputEvent = (e) => {
    emit("input", e);
  };
  const clearEvent = () => {
    modelValue.value = "";
    //获取焦点
    focusExpose();
  };

  return {
    isFocus,
    isHover,
    focusEvent,
    _blurEvent,
    viewPasswordEvent,
    clearEvent,
    inputEvent,
    mouseenterEvent,
    mouseleaveEvent,
    _changeEvent,
    keyupEvent,
    keydownEvent,
  };
}

export { useInputEvent };
