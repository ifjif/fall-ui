import { useTabPaneEvent } from "./use-tab-pane-event"
import { useTabPaneState } from "./use-tab-pane-state"
import { useTabPaneStyle } from "./use-tab-pane-style"
export function useTabPane(props, rootTabs) {
  const { isShow } = useTabPaneState(props, rootTabs)
  const { } = useTabPaneEvent()
  const { } = useTabPaneStyle()
  return { isShow }
}
