import { useCheckboxEvent } from "./use-checkbox-event";
import { useCheckboxState } from "./use-checkbox-state";
import { useCheckboxGroup } from "./use-checkbox-group";
import { useCheckboxStyle } from "./use-checkbox-style";
function useCheckbox(props, emit, modelValue) {
  const { groupValue, isGroup, formItemKey, isFormItem } = useCheckboxGroup(
    props,
  );
  const { model, isSelected, _loading, _size } = useCheckboxState(
    props,
    groupValue,
    isGroup,
    modelValue,
    formItemKey,
    isFormItem,
  );
  const { changeEvent, clickEvent } = useCheckboxEvent(
    props,
    emit,
    model,
    isGroup,
    _loading,
  );

  const {
    checkboxStyle
  } = useCheckboxStyle(props)

  return {
    model,
    isSelected,
    _loading,
    _size,
    changeEvent,
    clickEvent,
    checkboxStyle,
  };
}

export { useCheckbox };
