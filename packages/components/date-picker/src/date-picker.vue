<template>
  <div ref="datePickerRef" class="ep-date-picker">
    <!-- 输入框 -->
    <div class="ep-input__wrapper" @click="togglePicker">
      <span class="ep-input__prefix-icon">
        <InputPrefixIcon />
      </span>
      <input class="ep-input__inner" type="text" :value="displayValue" :placeholder="placeholder" readonly />
      <span class="ep-input__suffix-icon" v-if="modelValue" @click.stop="clearDate">
        <InputSuffixIcon />
      </span>
    </div>

    <!-- 日历弹窗 -->
    <div v-show="showPicker" class="ep-picker-panel">
      <!-- 快捷选项 -->
      <div class="ep-picker-panel__sidebar">
        <button @click="handleShortcutClick(shortCut)" v-for="shortCut in shortCuts" :key="shortCut.text">
          {{ shortCut.text }}
        </button>
      </div>

      <!-- 日历主体 -->
      <div class="ep-picker-panel__body">
        <!-- 头部日历切换 -->
        <div class="ep-picker-panel__header">
          <button @click="prevMonth">
            <TogglePrevIcon />
          </button>
          <span>{{ currentMonthName }} {{ currentYear }}</span>
          <button @click="nextMonth">
            <ToggleNextIcon />
          </button>
        </div>
        <!-- 星期标题 -->
        <div class="ep-picker-panel__content">
          <table class="ep-date-table">
            <thead>
              <tr>
                <th class="ep-date-table-cell" v-for="day in weekDays" :key="day">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, index) in calendarDays" :key="index">
                <th @click="selectDate(dayObj)" class="ep-date-table-cell" :class="{
                  'current': dayObj.isCurrentMonth,
                  'today': dayObj.isToday,
                  'selected': dayObj.isSelected,
                  'disabled': dayObj.isDisabled
                }" v-for="dayObj in week" :key="dayObj.date.toISOString()">
                  <div class="ep-date-table-cell__text">{{ dayObj.date.getDate() }}</div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
import InputPrefixIcon from './icons/input-prefix-icon.vue';
import InputSuffixIcon from './icons/input-suffix-icon.vue';
import TogglePrevIcon from './icons/toggle-prev-icon.vue';
import ToggleNextIcon from './icons/toggle-next-icon.vue';
const ns = useNamespace('date-picker')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { computed, ref, onMounted, onUnmounted } from 'vue'
const ns = useNamespace('date-picker')

const props = defineProps({
  modelValue: {
    type: [String, Date],
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择日期'
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])
const datePickerRef = ref(null)

// 常量与计算属性
const showPicker = ref(false)
const currentDate = ref(new Date()) // 当前日期,用于控制面板显示信息
const weekDays = ['日', '一', '二', '三', '四', '五', '六']
const monthNames = [
  '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
]
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const currentMonthName = computed(() => monthNames[currentMonth.value])

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  return formatDate(new Date(props.modelValue), props.format)
})

// 快捷选项
const shortCuts = [
  {
    text: '今天',
    value: () => new Date()
  },
  {
    text: '昨天',
    value: () => {
      const d = new Date()
      d.setDate(d.getDate() - 1)
      return d
    }
  },
  {
    text: '本周',
    value: () => {
      const d = new Date()
      return new Date(d.setDate(d.getDate() - d.getDay() + 1))
    }
  },
  {
    text: '本月',
    value: () => {
      const d = new Date()
      return new Date(d.getFullYear(), d.getMonth(), 1)
    }
  }
]

// 上个月
const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}
// 下个月
const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}
// 选择日期
const selectDate = (dayObj) => {
  if (dayObj.isDisabled || !dayObj.isCurrentMonth) return

  const newDate = dayObj.date
  emit('update:modelValue', newDate)
  emit('change', newDate)
}
// 清空日期
const clearDate = () => {
  emit('update:modelValue', '')
  emit('change', '')
}
// 处理shortCut点击
const handleShortcutClick = (shortCut) => {
  const date = shortCut.value()
  emit('update:modelValue', date)
  emit('change', date)
}
// 展示面板
const togglePicker = () => {
  showPicker.value = !showPicker.value
  if (showPicker.value) {
    // 打开时，显示选择的月份
    if (props.modelValue) {
      currentDate.value = new Date(props.modelValue)
    } else {
      currentDate.value = new Date()
    }
  }
}

// 日历网格生成逻辑
const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay() // 0 sun 6 sat
  const daysInMonth = lastDayOfMonth.getDate()

  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 填充上个月的日子
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push(createDateObject(new Date(year, month - 1, prevMonthLastDay - i), false))
  }

  // 填充当月的日子
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(createDateObject(new Date(year, month, i), true))
  }

  // 填充下个月的日子，凑够 42格 (6r * 7c)
  const remainingCells = 42 - days.length
  for (let i = 1; i <= remainingCells; i++) {
    days.push(createDateObject(new Date(year, month + 1, i), false))
  }

  // 将一维数组转换为 二维数组，方便渲染
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return weeks
})

// 生成要显示的 日期结构
const createDateObject = (date, isCurrentMonth) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const isSelected = props.modelValue && d.getTime() === new Date(props.modelValue).getTime()
  const isToday = d.getTime() === today.getTime()
  let isDisabled = false
  if (props.disalbedDate) {
    isDisabled = props.disabledDate[date]
  }

  return {
    date,
    isCurrentMonth,
    isSelected,
    isToday,
    isDisabled
  }
}

// 格式化日期函数
const formatDate = (date, formatStr) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return formatStr.replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)

}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  // 非当前 组件，进行关闭
  if (datePickerRef.value && !datePickerRef.value.contains(event.target)) {
    showPicker.value = false
  }
}
</script>
<style scoped>
.ep-date-picker {
  position: relative;
  display: inline-block;
  width: 240px;
  font-size: 14px;
  color: #606266;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.ep-input__wrapper {
  display: flex;
  align-items: center;
  height: 32px;
  line-height: 32px;
  border: 1px solid #dcdfe6;
  padding: 0 10px;
  cursor: pointer;
  background-color: #fff;
  transition: border-color 0.2s;
  border-radius: 4px;
}

.ep-input__inner {
  border: none;
  outline: none;
  background-color: transparent;
  height: 100%;
  flex: 1;
  color: #606266;
  font-size: 14px;
  padding: 0;
  margin: 0 5px;
}

.ep-input__prefix-icon,
.ep-input__suffix-icon {
  display: flex;
  align-items: center;
  color: #c0c4cc;
  cursor: pointer;
}

.ep-date-table {
  width: 100%;
  border-collapse: collapse;
}

.ep-date-table-cell {
  padding: 8px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  transition: background-color 0.2s;
}

.ep-date-table-cell__text {
  width: 28px;
  height: 28px;
  line-height: 28px;
  margin: 0 auto;
  border-radius: 50%;
}

.ep-date-table-cell:hover:not(.disabled) {
  background-color: #f5f7fa;
}

.ep-date-table-cell.current {
  color: #606266;
}

.ep-date-table-cell:not(.current) {
  color: #c0c4cc;
}

.ep-date-table-cell.today .ep-date-table-cell__text {
  color: #409eff;
  font-weight: bold;
}

.ep-date-table-cell.selected .ep-date-table-cell__text {
  background-color: #409eff;
  color: #fff;
}

.ep-date-table-cell.disabled {
  color: #e4e7ed;
  cursor: not-allowed;
}

.ep-picker-panel {
  display: flex;
  position: absolute;
  z-index: 2000;
  left: 0;
  top: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.ep-picker-panel__sidebar {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-right: 1px solid #e4e7ed;
  width: 80px;
}

.ep-picker-panel__body {
  flex: 1;
  padding: 10px;
}
</style>
