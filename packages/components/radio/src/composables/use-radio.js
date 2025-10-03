import { useRadioEvent } from "./use-radio-event";
import { useRadioState } from "./use-radio-state";
import { useRadioGroup } from "./use-radio-group";
function useRadio(props, emit, modelValue) {
  const { groupValue, isGroup } = useRadioGroup();
  const { model, isSelected, _loading, _size } = useRadioState(
    props,
    groupValue,
    isGroup,
    modelValue,
  );
  const { changeEvent, clickEvent } = useRadioEvent(
    props,
    emit,
    model,
    _loading,
    isSelected,
  );

  return {
    model,
    isSelected,
    _loading,
    _size,
    changeEvent,
    clickEvent,
  };
}

export { useRadio };
