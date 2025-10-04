import { useMessageEvent } from "./use-message-event";
import { useMessageState } from "./use-message-state";

export function useMessage(props) {
  const {
    icon,
    theme,
    height,
    messageRef,
    top,
    show,
    zIndexStyle,
    bottomOffset,
    nextZIndex,
  } = useMessageState(props);
  const {
    close,
    start,
    mouseenterEvent,
  } = useMessageEvent(props, show);

  return {
    icon,
    theme,
    height,
    messageRef,
    top,
    show,
    close,
    start,
    zIndexStyle,
    bottomOffset,
    nextZIndex,
    mouseenterEvent,
  };
}
