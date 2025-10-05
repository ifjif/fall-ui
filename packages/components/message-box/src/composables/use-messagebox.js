import { useMessageBoxEvent } from "./use-messagebox-event";
import { useMessageBoxState } from "./use-messagebox-state";

export function useMessageBox(props, emit) {
  const {
    themeIcon,
    themeType,
    Button,
    Icon,
    Mask,
    isStringContent,
    isVNodeContent,
    zIndexStyle,
    nextZIndex,
    widthStyle,
  } = useMessageBoxState(props);
  const { close, cancelEvent, confirmEvent } = useMessageBoxEvent(props, emit);

  return {
    widthStyle,
    isStringContent,
    zIndexStyle,
    nextZIndex,
    isVNodeContent,
    themeIcon,
    themeType,
    Button,
    Icon,
    Mask,
    close,
    cancelEvent,
    confirmEvent,
  };
}
