export function useDatePickerPanelEvent(
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
) {
  // 前一个
  const prev = () => {
    switch (props.type) {
      case 'week':
      case "dates":
      case "date": {
        currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
        break
      }
      case "months":
      case "month": {
        currentDate.value = new Date(currentYear.value - 1, 0, 1)
        break
      }
      case "years":
      case "year": {
        currentDate.value = new Date(years.value[0].label - 1, 0, 1)
        break
      }
    }
  }

  // 下一个
  const next = () => {
    switch (props.type) {
      case 'week':
      case "dates":
      case "date": {
        currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
        break
      }
      case "months":
      case "month": {
        currentDate.value = new Date(currentYear.value + 1, 0, 1)
        break
      }
      case "years":
      case "year": {
        currentDate.value = new Date(years.value[9].label + 1, 0, 1)
        break
      }
    }
  }


  // 选择 周事件
  const selectWeek = (week) => {
    if (props.type !== 'week') return
    const day1 = week[0]
    if (day1.isDisabled) return
    const day7 = week[6]

    startRange.value = day1.date
    endRange.value = day7.date
    moduleValue.value = [startRange.value, endRange.value]
  }

  // 选择 日事件
  const selectDate = (day) => {
    if (props.type === 'week' || day.isDisabled || !day.isCurrentMonth) return

    if (props.type === 'dates') {
      const result = moduleValue.value
      const index = result.findIndex(v => clearDateTime(v).getTime() === day.date.getTime())
      if (index < 0) {
        result.push(day.date)
      } else {
        result.splice(index, 1)
      }
      result.sort((a, b) => a.getTime() - b.getTime())
      moduleValue.value = [...result]
      return
    }

    setBaseRange(day.date)
  }

  // 选择 月事件
  const selectMonth = (month) => {
    if (month.isDisabled) return

    if (props.type === 'months') {
      const result = moduleValue.value
      const index = result.findIndex(v => getMonthValue(v) === getMonthValue(month.date))
      if (index < 0) {
        result.push(month.date)
      } else {
        result.splice(index, 1)
      }
      result.sort((a, b) => getMonthValue(a) - getMonthValue(b))
      moduleValue.value = [...result]
      return
    }

    setBaseRange(month.date)
  }

  // 选择 年事件
  const selectYear = (year) => {
    if (year.isDisabled) return

    if (props.type === 'years') {
      const result = moduleValue.value
      const index = result.findIndex(v => v.getFullYear() === year.date.getFullYear())
      if (index < 0) {
        result.push(year.date)
      } else {
        result.splice(index, 1)
      }
      result.sort((a, b) => a.getFullYear() - b.getFullYear())
      moduleValue.value = [...result]
      return
    }

    setBaseRange(year.date)
  }

  // 鼠标进入事件
  const handleMouseenter = (data) => {
    if (!baseRangeDate.value) return

    switch (props.type) {
      case 'date': {
        setRange(data.date.getTime(), baseRangeDate.value.getTime(), data.date)
        break
      }
      case 'month': {
        setRange(getMonthValue(data.date), getMonthValue(baseRangeDate.value), data.date)
        break
      }
      case 'year': {
        setRange(data.date.getFullYear(), baseRangeDate.value.getFullYear(), data.date)
        break
      }
    }

  }

  return {
    prev,
    next,
    selectWeek,
    selectDate,
    selectMonth,
    selectYear,
    handleMouseenter
  }
}

