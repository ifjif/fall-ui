import { useDatePickerPanelState } from "./use-date-picker-panel-state"
import { useDatePickerPanelEvent } from './use-date-picker-panel-event'
import { useDatePickerPanelGlobal } from "./use-date-picker-panel-global"
import { useDatePickerPanelUtils } from "./use-date-picker-panel-utils"
export function useDatePickerPanel(props, moduleValue) {
  const {
    clearDateTime,
    getISOWeekNumber,
    setInRangeAndSelected,
    getMonthValue
  } = useDatePickerPanelGlobal()

  const {
    baseRangeDate,
    startRange,
    endRange,
    weekDays,
    title,
    days,
    months,
    years,
    currentDate,
    currentMonth,
    currentYear,
  } = useDatePickerPanelState(
    props,
    moduleValue,
    clearDateTime,
    getISOWeekNumber,
    setInRangeAndSelected,
    getMonthValue
  )

  const {
    setBaseRange,
    setRange
  } = useDatePickerPanelUtils(
    props,
    moduleValue,
    baseRangeDate,
    startRange,
    endRange,
  )

  const {
    prev,
    next,
    selectWeek,
    selectDate,
    selectMonth,
    selectYear,
    handleMouseenter
  } = useDatePickerPanelEvent(
    props,
    moduleValue,
    years,
    currentDate,
    currentMonth,
    currentYear,
    baseRangeDate,
    startRange,
    endRange,
    clearDateTime,
    setBaseRange,
    getMonthValue,
    setRange,
  )

  return {
    title,
    weekDays,
    days,
    months,
    years,
    startRange,
    endRange,
    prev,
    next,
    selectWeek,
    selectDate,
    selectMonth,
    selectYear,
    handleMouseenter
  }
}
