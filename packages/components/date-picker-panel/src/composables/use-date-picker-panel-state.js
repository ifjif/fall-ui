import { ref, computed } from 'vue'
export function useDatePickerPanelState(
  props,
  moduleValue,
  clearDateTime,
  getISOWeekNumber,
  setInRangeAndSelected,
  getMonthValue
) {
  const baseRangeDate = ref(null)
  const startRange = ref(null)
  const endRange = ref(null)

  const createDateObject = (date, isCurrentMonth) => {
    const d = new Date(date)
    clearDateTime(d)
    const today = new Date()
    clearDateTime(today)
    const isToday = d.getTime() === today.getTime()
    let isDisabled = props.disabled

    const info = setInRangeAndSelected(d.getTime(), startRange.value?.getTime(), endRange.value?.getTime())

    const dob = {
      date: d,
      weekNum: getISOWeekNumber(d),
      isCurrentMonth,
      isSelected: false,
      isToday,
      isDisabled,
      inRange: info.inRange,
    }

    if (props.type === 'date') {
      dob.isSelected = moduleValue.value && d.getTime() === clearDateTime(new Date(moduleValue.value)).getTime()
    } else if (props.type === 'dates') {
      dob.isSelected = moduleValue.value && moduleValue.value.some(v => {
        return d.getTime() === clearDateTime(new Date(v)).getTime()
      })
    }


    if (info.isSelected) {
      dob.isSelected = info.isSelected
    }


    return dob
  }



  // 生成 date 时，判断是否要把上个月的 日 加入前面
  let sunLast = 0
  const weekDays = computed(() => {
    const init = ['一', '二', '三', '四', '五', '六']
    if (props.type === 'week') {
      sunLast = 1
      init.push('日')
    } else {
      init.unshift('日')
    }
    return init
  })
  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
  ]
  // 仅用来计算日期
  const currentDate = ref(new Date())
  const currentYear = computed(() => currentDate.value.getFullYear())
  const currentMonth = computed(() => currentDate.value.getMonth())
  const currentMonthName = computed(() => monthNames[currentMonth.value])

  const title = computed(() => {
    switch (props.type) {
      case 'week':
      case 'dates':
      case 'date': {
        return `${currentMonthName.value} ${currentYear.value}`
      }
      case 'months':
      case 'month': {
        return `${currentYear.value}`
      }
      case 'years':
      case 'year': {
        if (years.value.length < 0) return
        return `${years.value[0].label} - ${years.value[9].label}`
      }
    }
  })


  // 6 * 7
  const days = computed(() => {
    const year = currentYear.value
    const month = currentMonth.value
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const dayInMonth = lastDayOfMonth.getDate()
    let firstDayOfWeek = firstDayOfMonth.getDay()
    // week是，日变为7
    if (props.type === 'week') {
      firstDayOfWeek = firstDayOfWeek || 7
    }

    const days = []
    const today = new Date()
    clearDateTime(today)

    // 填充上个日期
    // 当是 week时，(sunLast:1)firstDayOfWeek 是7,需要填充 6个 (日在最后)
    //  第一个为 lastDayOfMonth - 6 + 1
    // 当不是 week时，(sunLast:0)firstDayOfWeek 是0,不需要填充 (日在最前)
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate()
    for (let i = firstDayOfWeek - 1; i >= sunLast; i--) {
      days.push(createDateObject(new Date(year, month - 1, lastDayOfPrevMonth - i + sunLast), false))
    }

    // 填充当前月
    for (let i = 1; i <= dayInMonth; i++) {
      days.push(createDateObject(new Date(year, month, i), true))
    }

    // 填充下个月
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push(createDateObject(new Date(year, month + 1, i), false))
    }

    const weeks = []

    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }

    return weeks
  })


  // 生成月份
  const months = computed(() => {
    const year = currentYear.value

    const today = new Date()

    const months = monthNames.map((name, index) => {
      const date = clearDateTime(new Date(year, index, 1))
      const isDisabled = props.disabled

      const info = setInRangeAndSelected(
        getMonthValue(date),
        getMonthValue(startRange.value),
        getMonthValue(endRange.value)
      )
      const mo = {
        date,
        label: `${index + 1}月`,
        isCurrentMonth: today.getMonth() === index && today.getFullYear() == year,
        isSelected: false,
        isDisabled,
        inRange: info.inRange,
      }

      if (props.type === 'months') {
        mo.isSelected = moduleValue.value && moduleValue.value.some(v => {
          return getMonthValue(v) === getMonthValue(date)
        })
      } else if (props.type === 'month' && !props.range) {
        mo.isSelected = getMonthValue(date) === getMonthValue(moduleValue.value)
      }

      if (info.isSelected) {
        mo.isSelected = info.isSelected
      }

      return mo
    })

    return months
  })

  // 生成年份
  const years = computed(() => {
    const isDisabled = props.disabled
    const year = currentYear.value
    const lastBit = year % 10
    const zeroBitYear = year - lastBit

    const today = new Date()
    const years = []
    for (let i = 0; i < lastBit; i++) {
      years.push(clearDateTime(new Date(zeroBitYear + i, 0, 1)))
    }

    years.push(new Date(year, 0, 1))

    const remainingYears = 10 - lastBit
    for (let i = 1; i < remainingYears; i++) {
      years.push(clearDateTime(new Date(year + i, 0, 1)))
    }

    return years.map((v) => {
      const info = setInRangeAndSelected(v.getFullYear(), startRange.value?.getFullYear(), endRange.value?.getFullYear())
      const yo = {
        date: v,
        label: v.getFullYear(),
        isCurrentYear: v.getFullYear() === today.getFullYear(),
        isSelected: false,
        isDisabled,
        inRange: info.inRange,
      }

      if (props.type === 'years') {
        yo.isSelected = moduleValue.value && moduleValue.value.some(o => {
          return o.getFullYear() === v.getFullYear()
        })
      } else if (props.type === 'year' && !props.range) {
        yo.isSelected = moduleValue.value && v.getFullYear() === moduleValue.value.getFullYear()
      }

      if (info.isSelected) {
        yo.isSelected = info.isSelected
      }
      return yo
    })
  })

  return {
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
  }
}
