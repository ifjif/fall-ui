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
import { useDatePickerPanel } from './composables/use-date-picker-panel';
const ns = useNamespace('date-picker-panel')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { watch } from 'vue'
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

const {
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
} = useDatePickerPanel(props, moduleValue)

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

</script>
