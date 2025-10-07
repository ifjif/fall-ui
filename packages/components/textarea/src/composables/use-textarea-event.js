import { useEvent } from "@fall-ui/hooks";
function useTextareaEvent(modelValue, emit, focusExpose) {
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
    blurEvent,
    clearEvent,
    inputEvent,
    mouseenterEvent,
    mouseleaveEvent,
    changeEvent,
    keyupEvent,
    keydownEvent,
  };
}

export { useTextareaEvent };
