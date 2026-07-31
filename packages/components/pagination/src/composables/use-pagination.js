import { usePaginationEvent } from "./use-pagination-event";
import { usePaginationState } from "./use-pagination-state";
import { usePaginationStyle } from "./use-pagination-style";

export function usePagination(props, currentPage, pageSize, emit) {
  const {
    pagerList,
    pageCount,
    jumpPage,
    layoutList,
  } = usePaginationState(props, currentPage)

  const {
    pageChange,
    pagerClick,
    handleSizeChange,
    handleJumpBlur
  } = usePaginationEvent(props, emit, currentPage, pageSize, pageCount, jumpPage)

  const {

  } = usePaginationStyle()

  return {
    pagerList,
    jumpPage,
    layoutList,
    pageChange,
    pagerClick,
    handleSizeChange,
    handleJumpBlur
  }
}
