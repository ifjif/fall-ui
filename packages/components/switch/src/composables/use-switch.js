import { useSwitchState } from "./use-switch-state";
import { useSwitchEvent } from "./use-switch-event";

export function useSwitch(props, emit, modelValue) {
  const { checked, centerIcon, _loading } = useSwitchState(props, modelValue);
  const { clickEvent, changeEvent } = useSwitchEvent(
    props,
    emit,
    _loading,
    checked,
  );

  return {
    checked,
    centerIcon,
    _loading,
    clickEvent,
    changeEvent,
  };
}
