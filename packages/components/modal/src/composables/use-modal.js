import { useModalState } from "./use-modal-state";
import { useModalEvent } from "./use-model-event";

export function useModal(props, emit, visible) {
  const {
    widthStyle,
    zIndexStyle,
    nextZIndex
  } = useModalState(props);
  const { cancelEvent, confirmEvent } = useModalEvent(emit, visible);

  return {
    widthStyle,
    zIndexStyle,
    nextZIndex,
    cancelEvent,
    confirmEvent,
  };
}
