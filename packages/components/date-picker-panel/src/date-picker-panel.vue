<template>
  <div :class="[ns.b()]">
    <div :class="[ns.e('header')]">
      <span :class="[ns.e('prev-icon')]" @click="prev">
        <TogglePrevIcon />
      </span>
      <span :class="[ns.e('title')]">
        {{ title }}
      </span>
      <span :class="[ns.e('next-icon')]" @click="next">
        <ToggleNextIcon />
      </span>
    </div>
    <div :class="[ns.e('body')]">
      <table v-if="['date', 'dates', 'week'].includes(type)" :class="[ns.e('table')]">

        <thead>
          <tr>
            <th v-if="props.type === 'week'" :class="[ns.e('week-number')]">周</th>
            <th :class="[ns.e('header-cell')]" v-for="day in weekDays">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="selectWeek(week)" :class="[ns.is('week', props.type === 'week')]" v-for="(week, index) in days"
            :key="index">
            <th v-if="props.type === 'week'" :class="[ns.e('week-number')]">{{ week[0].weekNum }}</th>
            <th :class="[ns.e('cell'), ns.is('current', day.isCurrentMonth),
            ns.is('today', day.isToday),
            ns.is('disabled', day.isDisabled),
            ns.is('in-range', day.inRange)
            ]" v-for="(day) in week" :key="day.date.toISOString()" @mouseenter="handleMouseenter(day)"
              @click="selectDate(day)">
              <div :class="[ns.e('cell_text'), ns.is('selected', day.isSelected)]">
                {{ day.date.getDate() }}
              </div>
            </th>
          </tr>
        </tbody>
      </table>

      <div v-else-if="['month', 'months'].includes(type)" :class="[ns.e('month-table')]">
        <div @click="selectMonth(month)" @mouseenter="handleMouseenter(month)" :class="[ns.e('month-table-cell'),
        ns.is('current', month.isCurrentMonth),
        ns.is('selected', month.isSelected),
        ns.is('disabled', month.isDisabled),
        ns.is('in-range', month.inRange)
        ]" v-for="(month, index) in months" :key="index">
          {{ month.label }}
        </div>
      </div>


      <div v-else-if="['year', 'years'].includes(type)" :class="[ns.e('month-table')]">
        <div @click="selectYear(year)" @mouseenter="handleMouseenter(year)" :class="[ns.e('month-table-cell'),
        ns.is('current', year.isCurrentYear),
        ns.is('selected', year.isSelected),
        ns.is('disabled', year.isDisabled),
        ns.is('in-range', year.inRange)
        ]" v-for="(year, index) in years" :key="index">
          {{ year.label }}
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';

const ns = useNamespace('date-picker-panel')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { ref, computed, watch } from 'vue'
import TogglePrevIcon from './icons/toggle-prev-icon.vue';
import ToggleNextIcon from './icons/toggle-next-icon.vue';
const ns = useNamespace('date-picker-panel')

const props = defineProps({
  type: {
    type: String,
    default: 'date',
    validator(v) {
      return ['date', 'dates', 'week', 'month', 'months', 'year', 'years'].includes(v)
    }
  },
  range: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const moduleValue = defineModel({
  type: [String, Object, Array],
  default: ''
})

const baseRangeDate = ref(null)
const startRange = ref(null)
const endRange = ref(null)

watch(() => moduleValue.value, (v) => {
  if (['dates', 'months', 'years'].includes(props.type) && !Array.isArray(v)) {
    moduleValue.value = []
    if (v) {
      moduleValue.value.push(v)
    }
  }

  if (props.range && Array.isArray(v)) {
    startRange.value = v[0]
    endRange.value = v[1]
  }

}, {
  immediate: true,
})

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

const setInRangeAndSelected = (target, start, end) => {
  const inRange = target >= start && target <= end
  const isSelected = target === start || target === end

  return {
    inRange,
    isSelected
  }
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

const clearDateTime = (date) => {
  date.setHours(0, 0, 0, 0)
  return date
}

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

const selectWeek = (week) => {
  if (props.type !== 'week') return
  const day1 = week[0]
  if (day1.isDisabled) return
  const day7 = week[6]

  startRange.value = day1.date
  endRange.value = day7.date
  moduleValue.value = [startRange.value, endRange.value]
}

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

// year * 100 + month
const getMonthValue = (d) => {
  if (!d) return null
  return d.getFullYear() * 100 + d.getMonth()
}

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
</script>
