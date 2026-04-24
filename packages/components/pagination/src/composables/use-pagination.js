import { usePaginationEvent } from "./use-pagination-event";
import { usePaginationState } from "./use-pagination-state";
import { usePaginationStyle } from "./use-pagination-style";

export function usePagination(props, emit) {
  const {
    pagerList,
    pageCount,
    currentPageSize,
    jumpPage,
    layoutList,
  } = usePaginationState(props)

  const {
    pageChange,
    pagerClick,
    handleSizeChange,
    handleJumpBlur
  } = usePaginationEvent(props, emit, pageCount, currentPageSize, jumpPage)

  const {

  } = usePaginationStyle()

  return {
    pagerList,
    currentPageSize,
    jumpPage,
    layoutList,
    pageChange,
    pagerClick,
    handleSizeChange,
    handleJumpBlur
  }
}
