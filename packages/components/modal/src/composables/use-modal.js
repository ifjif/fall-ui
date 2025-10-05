import { useModalState } from "./use-modal-state";
import { useModalEvent } from "./use-model-event";

export function useModal(props, emit, visible) {
  const { widthStyle } = useModalState(props);
  const { cancelEvent, confirmEvent } = useModalEvent(emit, visible);

  return {
    widthStyle,
    cancelEvent,
    confirmEvent,
  };
}
