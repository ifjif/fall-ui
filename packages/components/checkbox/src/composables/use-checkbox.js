import { useCheckboxEvent } from "./use-checkbox-event";
import { useCheckboxState } from "./use-checkbox-state";
import { useCheckboxGroup } from "./use-checkbox-group";
function useCheckbox(props, emit, modelValue) {
  const { groupValue, isGroup } = useCheckboxGroup(props);
  const { model, isSelected, _loading } = useCheckboxState(
    props,
    groupValue,
    isGroup,
    modelValue,
  );
  const { changeEvent, clickEvent } = useCheckboxEvent(
    props,
    emit,
    model,
    isGroup,
    _loading,
  );

  return {
    model,
    isSelected,
    _loading,
    changeEvent,
    clickEvent,
  };
}

export { useCheckbox };
