import { useDrawerEvent } from "./use-drawer-event";
import { useDrawerState } from "./use-drawer-state";

export function useDrawer(props, emit) {
  const {
    Button,
    Mask,
    widthStyle,
    heightStyle,
    isStringContent,
    isVNodeContent,
    zIndexStyle,
    nextZIndex
  } = useDrawerState(props);
  const { close, cancelEvent, confirmEvent } = useDrawerEvent(props, emit);
  return {
    zIndexStyle,
    nextZIndex,
    Button,
    Mask,
    widthStyle,
    heightStyle,
    close,
    cancelEvent,
    confirmEvent,
    isStringContent,
    isVNodeContent,
  };
}
