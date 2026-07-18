import { useRadioEvent } from "./use-radio-event";
import { useRadioState } from "./use-radio-state";
import { useRadioGroup } from "./use-radio-group";
import { useRadioStyle } from "./use-radio-style";
function useRadio(props, emit, modelValue) {
  const { groupValue, isGroup, isFormItem, formItemKey } = useRadioGroup();
  const { model, isSelected, _loading, _size } = useRadioState(
    props,
    groupValue,
    isGroup,
    modelValue,
    isFormItem,
    formItemKey,
  );
  const { changeEvent, clickEvent } = useRadioEvent(
    props,
    emit,
    model,
    _loading,
    isSelected,
  );

  const {
    radioStyle
  } = useRadioStyle(props)

  return {
    model,
    isSelected,
    _loading,
    _size,
    changeEvent,
    clickEvent,
    radioStyle,
  };
}

export { useRadio };
