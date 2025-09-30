import { useButtonState } from "./use-button-state";
import { useButtonEvent } from "./use-button-event";

function useButton(props, emit, parentSize) {
  const { _loading, controlSize } = useButtonState(props, parentSize)
  const { clickEvent } = useButtonEvent(props, emit, _loading)
  return {
    _loading,
    controlSize,
    clickEvent
  }
}

export { useButton }
