import { useTableEvent } from "./use-table-event";
import { useTableState } from "./use-table-state";
import { useTableStyle } from "./use-table-style";
import { useTableUtils } from "./use-table-utils";

export function useTable(props, emit) {

  const {
    visibleColumns,
    placeholderWidth,
    sortStates,
    paginatedData,
    innerCurrentPage,
    innerPageSize,
    filterValues,
    debounceTimers
  } = useTableState(props)
  const {
    getHeaderCellStyle,
    getCellStyle,
    clearCacheWidths,
    getSortOrder
  } = useTableStyle(visibleColumns, sortStates)
  const {
    startResize,
    handleResize,
    triggerSort,
    handleFilterSelect,
    handleFilterInput,
    handlePageChange
  } = useTableEvent(
    props,
    emit,
    clearCacheWidths,
    placeholderWidth,
    sortStates,
    filterValues,
    debounceTimers
  )
  const {
    getColByProp
  } = useTableUtils(props)

  return {
    visibleColumns,
    placeholderWidth,
    paginatedData,
    innerCurrentPage,
    innerPageSize,
    filterValues,
    getHeaderCellStyle,
    getCellStyle,
    getSortOrder,
    clearCacheWidths,
    startResize,
    handleResize,
    triggerSort,
    handleFilterSelect,
    handleFilterInput,
    handlePageChange,
    getColByProp,
  }
}
