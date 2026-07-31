import { useDatePickerState } from "./use-date-picker-state"
import { useDatePickerEvent } from "./use-date-picker-event"
import { useDatePickerGlobal } from "./use-date-picker-global"
export function useDatePicker(props, modelValue) {

  const {
    formatDate
  } = useDatePickerGlobal()

  const {
    displayValue
  } = useDatePickerState(props, modelValue, formatDate)

  const {
    handleShortcutClick,
    clearDate
  } = useDatePickerEvent(modelValue)

  return {
    displayValue,
    handleShortcutClick,
    clearDate
  }
}
