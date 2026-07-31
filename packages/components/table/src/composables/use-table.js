import { useTableGlobal } from "./use-table-global";
import { useTableEvent } from "./use-table-event";
import { useTableState } from "./use-table-state";
import { useTableStyle } from "./use-table-style";
import { useTableUtils } from "./use-table-utils";

export function useTable(props, emit, selection) {
  const {
    getRowKey,
    getRowKeys
  } = useTableGlobal(props)

  const {
    selectionMap,
    visibleColumns,
    placeholderWidth,
    placeholderRight,
    sortStates,
    paginatedData,
    innerCurrentPage,
    innerPageSize,
    filterValues,
    debounceTimers,
    isTreeData,
    expandedKeys,
    flatData,
    allSelected,
    partialSelected,
  } = useTableState(props, getRowKeys)

  const {
    getColByProp,
    flattenTree,
    updateFlatData,
    collectExpandableKeys,
    updateSelectionModel,
    pageSelection
  } = useTableUtils(props, getRowKey, expandedKeys, paginatedData, flatData, selection, selectionMap)

  const {
    styles,
    getHeaderCellStyle,
    getCellStyle,
    clearCacheWidths,
    getSortOrder
  } = useTableStyle(props, visibleColumns, sortStates, isTreeData)

  const {
    startResize,
    handleResize,
    triggerSort,
    handleFilterSelect,
    handleFilterInput,
    handlePageChange,
    toggleExpand,
    toggleRowSelection,
    toggleAllSelection,
  } = useTableEvent(
    props,
    emit,
    clearCacheWidths,
    placeholderWidth,
    sortStates,
    filterValues,
    debounceTimers,
    expandedKeys,
    updateFlatData,
    getRowKey,
    selectionMap,
    updateSelectionModel,
    pageSelection
  )

  return {
    selectionMap,
    visibleColumns,
    placeholderWidth,
    placeholderRight,
    paginatedData,
    innerCurrentPage,
    innerPageSize,
    filterValues,
    isTreeData,
    expandedKeys,
    flatData,
    allSelected,
    partialSelected,
    styles,
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
    toggleExpand,
    toggleRowSelection,
    toggleAllSelection,
    getColByProp,
    getRowKey,
    flattenTree,
    collectExpandableKeys,
  }
}
