import { useAnchorGlobal } from "./use-anchor-global";
import { useAnchorState } from "./use-anchor-state";
import { useAnchorEvent } from "./use-anchor-event";
import { useAnchorUtils } from "./use-anchor-utils";
import { useAnchorStyle } from "./use-anchor-style";

export function useAnchor(props, emit) {

  const {
    flattenTree,
    getAnchorEl,
    getScrollContainer,
    getScrollTop,
  } = useAnchorGlobal()

  const {
    flatData,
    anchorListRef,
    activeHref,
  } = useAnchorState(props, flattenTree)

  const {
    activeBarStyle,
    anchorStyle
  } = useAnchorStyle()

  const {
    updateActiveBar
  } = useAnchorUtils(anchorListRef, activeBarStyle)


  const {
    handleClick,
    addScrollEvent,
    removeScrollEvent,
    scrollEvent,
  } = useAnchorEvent(
    props,
    emit,
    flatData,
    activeHref,
    getAnchorEl,
    getScrollContainer,
    getScrollTop,
    updateActiveBar,
  )


  return {
    anchorListRef,
    activeHref,
    handleClick,
    addScrollEvent,
    removeScrollEvent,
    scrollEvent,
    anchorStyle,
    activeBarStyle,
  }
}
