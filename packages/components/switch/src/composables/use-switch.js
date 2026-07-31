import { useSwitchState } from "./use-switch-state";
import { useSwitchEvent } from "./use-switch-event";
import { useSwitchStyle } from "./use-switch-style";

export function useSwitch(props, emit, modelValue) {
  const { checked, centerIcon, _loading } = useSwitchState(props, modelValue);
  const { clickEvent, changeEvent } = useSwitchEvent(
    props,
    emit,
    _loading,
    checked,
  );

  const {
    switchStyle
  } = useSwitchStyle(props)

  return {
    checked,
    centerIcon,
    _loading,
    clickEvent,
    changeEvent,
    switchStyle
  };
}
