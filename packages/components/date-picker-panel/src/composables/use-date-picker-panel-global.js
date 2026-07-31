export function useDatePickerPanelGlobal() {
  const clearDateTime = (date) => {
    date.setHours(0, 0, 0, 0)
    return date
  }

  // 生成 ISO标准的 年 周数
  // 一周的第一天是：周一
  // 第一周必须包含当年的周四
  const getISOWeekNumber = (date) => {
    // 转换为UTC，不受时区
    const dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = dateUTC.getUTCDay() || 7
    // 得到周四
    dateUTC.setUTCDate(dateUTC.getUTCDate() + 4 - dayNum)
    // 周四所在 年 1.1
    const startYear = new Date(Date.UTC(dateUTC.getUTCFullYear(), 0, 1))
    // 距 1.1的天数差 / 7 得到周数
    return Math.ceil((((dateUTC - startYear) / 86400000) + 1) / 7)
  }


  const setInRangeAndSelected = (target, start, end) => {
    const inRange = target >= start && target <= end
    const isSelected = target === start || target === end

    return {
      inRange,
      isSelected
    }
  }

  // year * 100 + month
  const getMonthValue = (d) => {
    if (!d) return null
    return d.getFullYear() * 100 + d.getMonth()
  }

  return {
    clearDateTime,
    getISOWeekNumber,
    setInRangeAndSelected,
    getMonthValue
  }
}
