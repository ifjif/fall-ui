import { useTabsEvent } from "./use-tabs-event";
import { useTabsState } from "./use-tabs-state";
import { useTabsStyle } from "./use-tabs-style";

export function useTabs(ns, props, emit) {
  const {
    navRef,
    activeName,
    panes,
    activeTabRect
  } = useTabsState(props)

  const {
    registerPane,
    removePane,
    updateBar,
    toggleTab,
    handleAdd,
    handleRemove
  } = useTabsEvent(ns, emit, panes, navRef, activeTabRect)

  const {
    barStyle,
  } = useTabsStyle(props, activeTabRect)

  return {
    navRef,
    activeName,
    panes,
    registerPane,
    removePane,
    updateBar,
    toggleTab,
    handleAdd,
    handleRemove,
    barStyle
  }
}
