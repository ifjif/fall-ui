import { useButtonState } from "./use-button-state";
import { useButtonEvent } from "./use-button-event";
import { useButtonStyle } from "./use-button-style";

function useButton(props, emit, parentSize) {
  const { _loading, controlSize } = useButtonState(props, parentSize)
  const { clickEvent } = useButtonEvent(props, emit, _loading)
  const { btStyle } = useButtonStyle(props)
  return {
    _loading,
    controlSize,
    btStyle,
    clickEvent
  }
}

export { useButton }
