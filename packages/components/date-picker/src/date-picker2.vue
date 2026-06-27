<template>
  <div class="ep-date-picker" ref="datePickerRef">
    <!-- 输入框 -->
    <div class="ep-input__wrapper" @click="togglePicker">
      <span class="ep-input__prefix-icon">
        <InputPrefixIcon />
      </span>
      <input type="text" class="ep-input__inner" :value="displayValue" :placeholder="placeholder" readonly />
      <span v-if="modelValue" class="ep-input__suffix-icon" @click.stop="clearDate">
        <InputSuffixIcon />
      </span>
    </div>

    <!-- 日历弹窗 -->
    <div v-show="showPicker" class="ep-picker-panel">
      <!-- 快捷选项 -->
      <div class="ep-picker-panel__sidebar">
        <button v-for="shortcut in shortcuts" :key="shortcut.text" class="ep-button--text"
          @click="handleShortcutClick(shortcut)">
          {{ shortcut.text }}
        </button>
      </div>

      <!-- 日历主体 -->
      <div class="ep-picker-panel__body">
        <!-- 头部：月份切换 -->
        <div class="ep-picker-panel__header">
          <button type="button" class="ep-picker-panel__icon-btn" @click="prevMonth">
            <TogglePrevIcon />
          </button>
          <span class="ep-picker-panel__title">{{ currentMonthName }} {{ currentYear }}</span>
          <button type="button" class="ep-picker-panel__icon-btn" @click="nextMonth">
            <ToggleNextIcon />
          </button>
        </div>

        <!-- 星期标题 -->
        <div class="ep-picker-panel__content">
          <table class="ep-date-table">
            <thead>
              <tr>
                <th v-for="day in weekDays" :key="day" class="ep-date-table-cell">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, index) in calendarDays" :key="index">
                <td v-for="dayObj in week" :key="dayObj.date.toISOString()" class="ep-date-table-cell" :class="{
                  'current': dayObj.isCurrentMonth,
                  'today': dayObj.isToday,
                  'selected': dayObj.isSelected,
                  'disabled': dayObj.isDisabled
                }" @click="selectDate(dayObj)">
                  <div class="ep-date-table-cell__text">{{ dayObj.date.getDate() }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('date-picker')
export default {
  name: ns.b()
}
</script>

<script setup>
import InputPrefixIcon from './icons/input-prefix-icon.vue';
import InputSuffixIcon from './icons/input-suffix-icon.vue';
import TogglePrevIcon from './icons/toggle-prev-icon.vue';
import ToggleNextIcon from './icons/toggle-next-icon.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: [String, Date],
  placeholder: { type: String, default: '请选择日期' },
  format: { type: String, default: 'YYYY-MM-DD' },
  disabledDate: { type: Function, default: null },
});

const emit = defineEmits(['update:modelValue', 'change']);

// --- 状态 ---
const showPicker = ref(false);
const datePickerRef = ref(null);
const currentDate = ref(new Date()); // 用于控制日历面板显示的月份
const selectedDate = ref(props.modelValue ? new Date(props.modelValue) : new Date());

// --- 常量与计算属性 ---
const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentMonthName = computed(() => monthNames[currentMonth.value]);

const displayValue = computed(() => {
  if (!props.modelValue) return '';
  return formatDate(new Date(props.modelValue), props.format);
});

// --- 快捷选项 ---
const shortcuts = [
  { text: '今天', value: () => new Date() },
  { text: '昨天', value: () => { const d = new Date(); d.setDate(d.getDate() - 1); return d; } },
  { text: '本周', value: () => { const d = new Date(); return new Date(d.setDate(d.getDate() - d.getDay() + 1)); } },
  { text: '本月', value: () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); } },
];

// --- 日历网格生成逻辑 ---
const calendarDays = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
  const daysInMonth = lastDayOfMonth.getDate();

  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 填充上个月的日子
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push(createDayObject(new Date(year, month - 1, prevMonthLastDay - i), false));
  }

  // 填充当月的日子
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(createDayObject(new Date(year, month, i), true));
  }

  // 填充下个月的日子，凑够 42 格 (6行 x 7列)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push(createDayObject(new Date(year, month + 1, i), false));
  }

  // 将一维数组转换为二维数组，方便渲染表格
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
});

function createDayObject(date, isCurrentMonth) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isSelected = props.modelValue && d.getTime() === new Date(props.modelValue).getTime();
  const isToday = d.getTime() === today.getTime();
  let isDisabled = false;
  if (props.disabledDate) {
    isDisabled = props.disabledDate(date);
  }

  return {
    date,
    isCurrentMonth,
    isSelected,
    isToday,
    isDisabled
  };
}

// --- 方法 ---
function togglePicker() {
  showPicker.value = !showPicker.value;
  if (showPicker.value) {
    // 打开时，将日历面板定位到选中日期的月份
    if (props.modelValue) {
      currentDate.value = new Date(props.modelValue);
    } else {
      currentDate.value = new Date();
    }
  }
}

function clearDate() {
  emit('update:modelValue', '');
  emit('change', '');
  showPicker.value = false;
}

function prevMonth() {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
}

function nextMonth() {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
}

function selectDate(dayObj) {
  if (dayObj.isDisabled || !dayObj.isCurrentMonth) return;

  const newDate = dayObj.date;
  emit('update:modelValue', newDate);
  emit('change', newDate);
  showPicker.value = false;
}

function handleShortcutClick(shortcut) {
  const date = shortcut.value();
  emit('update:modelValue', date);
  emit('change', date);
  showPicker.value = false;
}

// 简单的日期格式化函数
function formatDate(date, formatStr) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return formatStr
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

// --- 生命周期 ---
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleClickOutside(event) {
  if (datePickerRef.value && !datePickerRef.value.contains(event.target)) {
    showPicker.value = false;
  }
}
</script>

<style scoped>
/* 基础样式重置与变量 */
.ep-date-picker {
  position: relative;
  display: inline-block;
  width: 240px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
  color: #606266;
  box-sizing: border-box;
}

/* 输入框样式 */
.ep-input__wrapper {
  display: flex;
  align-items: center;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 32px;
  line-height: 32px;
  transition: border-color 0.2s;
  cursor: pointer;
  background-color: #fff;
}

.ep-input__wrapper:hover {
  border-color: #c0c4cc;
}

.ep-input__inner {
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  color: #606266;
  font-size: 14px;
  padding: 0;
  margin: 0 5px;
  background: transparent;
}

.ep-input__prefix-icon,
.ep-input__suffix-icon {
  display: flex;
  align-items: center;
  color: #c0c4cc;
  cursor: pointer;
}

.ep-input__suffix-icon:hover {
  color: #909399;
}

/* 弹窗面板样式 */
.ep-picker-panel {
  position: absolute;
  z-index: 2000;
  top: 100%;
  left: 0;
  margin-top: 5px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  width: 300px;
}

/* 快捷选项栏 */
.ep-picker-panel__sidebar {
  padding: 10px;
  border-right: 1px solid #e4e7ed;
  width: 80px;
  display: flex;
  flex-direction: column;
}

.ep-button--text {
  background: none;
  border: none;
  color: #606266;
  text-align: left;
  padding: 8px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.ep-button--text:hover {
  background-color: #f5f7fa;
  color: #409eff;
}

/* 日历主体 */
.ep-picker-panel__body {
  flex: 1;
  padding: 10px;
}

.ep-picker-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.ep-picker-panel__title {
  font-weight: 500;
  font-size: 16px;
  color: #606266;
}

.ep-picker-panel__icon-btn {
  background: none;
  border: none;
  color: #606266;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.ep-picker-panel__icon-btn:hover {
  background-color: #f5f7fa;
}

/* 日期表格 */
.ep-date-table {
  width: 100%;
  border-collapse: collapse;
}

.ep-date-table-cell {
  padding: 8px 0;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  transition: background-color 0.2s;
}

.ep-date-table-cell:hover:not(.disabled) {
  background-color: #f5f7fa;
}

.ep-date-table-cell__text {
  width: 28px;
  height: 28px;
  line-height: 28px;
  margin: 0 auto;
  border-radius: 50%;
}

/* 状态样式 */
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
</style>
