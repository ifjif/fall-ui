export function useDatePickerPanelUtils(
  props,
  moduleValue,
  baseRangeDate,
  startRange,
  endRange,
) {
  const setBaseRange = (date) => {
    if (!props.range) {
      moduleValue.value = date
      return
    }
    if (!baseRangeDate.value) {
      baseRangeDate.value = date
      startRange.value = date
      endRange.value = date
    } else {
      baseRangeDate.value = null
    }

  }

  const setRange = (currentValue, baseValue, targetDate) => {
    if (currentValue > baseValue) {
      endRange.value = targetDate
      startRange.value = baseRangeDate.value
    } else {
      endRange.value = baseRangeDate.value
      startRange.value = targetDate
    }

    moduleValue.value = [startRange.value, endRange.value]
  }

  return {
    setBaseRange,
    setRange
  }
}
