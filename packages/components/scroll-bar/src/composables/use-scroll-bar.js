import { useScrollBarEvent } from "./use-scroll-bar-event";
import { useScrollBarState } from "./use-scroll-bar-state";
import { useScrollBarStyle } from "./use-scroll-bar-style";
export function useScrollBar(props, emit) {
  const {
    containerRef,
    contentRef,
    existScrollBar,
    showScrollBar,
    thumbHeightRatio,
    thumbHeight,
    trackHeight,
    thumbTopRate,
    scrollTop,
    maxScrollTop,
    thumbTop,
    startY,
    trackOffset,
    dragging,
    thumbWidth,
    thumbWidthRate,
    trackWidth,
    startX,
    thumbLeft,
    maxScrollLeft,
    scrollLeft,
    thumbLeftRate,
    trackHorizontalOffset,
    existHorizontalScrollBar
  } = useScrollBarState()
  const {
    width,
    height,
    thumbHeightStyle,
    thumbTopStyle,
    thumbWidthStyle,
    thumbLeftStyle,
    thumbRightStyle,
    thumbBottomStyle
  } = useScrollBarStyle(props, thumbHeight, thumbTop, thumbWidth, thumbLeft, scrollLeft, scrollTop)
  const {
    onScroll,
    scrollDown,
    scrollRight,
    onWheel,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = useScrollBarEvent(
    emit,
    containerRef,
    scrollTop,
    thumbTopRate,
    dragging,
    trackHeight,
    maxScrollTop,
    startY,
    trackOffset,
    trackWidth,
    startX,
    maxScrollLeft,
    scrollLeft,
    thumbLeftRate,
    trackHorizontalOffset
  )

  return {
    containerRef,
    contentRef,
    existScrollBar,
    showScrollBar,
    thumbHeightRatio,
    width,
    height,
    thumbHeightStyle,
    thumbTopStyle,
    thumbWidthStyle,
    thumbWidthRate,
    maxScrollTop,
    maxScrollLeft,
    dragging,
    thumbLeftStyle,
    thumbRightStyle,
    thumbBottomStyle,
    existHorizontalScrollBar,
    onScroll,
    scrollDown,
    scrollRight,
    onWheel,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

