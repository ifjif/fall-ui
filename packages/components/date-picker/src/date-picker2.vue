<template>
  <div class="ep-date-picker" ref="datePickerRef">
    <!-- 输入框 -->
    <div class="ep-input__wrapper" @click="togglePicker">
      <span class="ep-input__prefix-icon">📅</span>
      <input type="text" class="ep-input__inner" :value="displayValue" :placeholder="placeholder" readonly />
      <span v-if="modelValue && range" class="ep-input__suffix-icon" @click.stop="clearDate">❌</span>
    </div>

    <!-- 双面板日历弹窗 -->
    <div v-show="showPicker" class="ep-picker-panel ep-picker-panel--double">

      <!-- ========== 左侧面板 ========== -->
      <div class="ep-picker-panel__body">
        <div class="ep-picker-panel__header">
          <button type="button" class="ep-picker-panel__icon-btn" @click="prevPeriod('left')">⬅️</button>
          <span class="ep-picker-panel__title">{{ getPanelTitle(leftDate) }}</span>
          <button type="button" class="ep-picker-panel__icon-btn" @click="nextPeriod('left')">➡️</button>
        </div>
        <!-- 日期 / 周 -->
        <div v-if="type === 'date' || type === 'week'" class="ep-picker-panel__content">
          <table class="ep-date-table">
            <thead>
              <tr>
                <th v-if="type === 'week'" class="ep-date-table-cell week-number">周</th>
                <th v-for="day in weekDays" :key="day" class="ep-date-table-cell">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, index) in leftCalendarDays" :key="index"
                :class="{ 'week-row-hover': type === 'week' && hoverWeekIndex === index && hoverPanel === 'left' }">
                <td v-if="type === 'week'" class="ep-date-table-cell week-number">
                  <span class="week-number-text">{{ week[0].weekNumber }}</span>
                </td>
                <td v-for="dayObj in week" :key="dayObj.date.toISOString()" class="ep-date-table-cell"
                  :class="getCellClass(dayObj, 'left')" @click="selectDate(dayObj)"
                  @mouseenter="handleMouseEnter(dayObj, index, 'left')">
                  <div class="ep-date-table-cell__text">{{ dayObj.date.getDate() }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 月份 -->
        <div v-else-if="type === 'month'" class="ep-month-table">
          <div v-for="monthObj in leftMonthList" :key="monthObj.date.getTime()" class="ep-month-table-cell"
            :class="{ 'selected': monthObj.isSelected, 'in-range': monthObj.isInRange, 'disabled': monthObj.isDisabled }"
            @click="selectMonth(monthObj)" @mouseenter="handleMouseEnter(monthObj, -1, 'left')">
            {{ monthObj.label }}
          </div>
        </div>
        <!-- 年份 -->
        <div v-else-if="type === 'year'" class="ep-year-table">
          <div v-for="yearObj in leftYearList" :key="yearObj.year" class="ep-year-table-cell"
            :class="{ 'selected': yearObj.isSelected, 'in-range': yearObj.isInRange, 'disabled': yearObj.isDisabled }"
            @click="selectYear(yearObj)" @mouseenter="handleMouseEnter(yearObj, -1, 'left')">
            {{ yearObj.year }}
          </div>
        </div>
      </div>

      <!-- ========== 右侧面板 ========== -->
      <div class="ep-picker-panel__body">
        <div class="ep-picker-panel__header">
          <button type="button" class="ep-picker-panel__icon-btn" @click="prevPeriod('right')">⬅️</button>
          <span class="ep-picker-panel__title">{{ getPanelTitle(rightDate) }}</span>
          <button type="button" class="ep-picker-panel__icon-btn" @click="nextPeriod('right')">➡️</button>
        </div>
        <!-- 日期 / 周 -->
        <div v-if="type === 'date' || type === 'week'" class="ep-picker-panel__content">
          <table class="ep-date-table">
            <thead>
              <tr>
                <th v-if="type === 'week'" class="ep-date-table-cell week-number">周</th>
                <th v-for="day in weekDays" :key="day" class="ep-date-table-cell">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, index) in rightCalendarDays" :key="index"
                :class="{ 'week-row-hover': type === 'week' && hoverWeekIndex === index && hoverPanel === 'right' }">
                <td v-if="type === 'week'" class="ep-date-table-cell week-number">
                  <span class="week-number-text">{{ week[0].weekNumber }}</span>
                </td>
                <td v-for="dayObj in week" :key="dayObj.date.toISOString()" class="ep-date-table-cell"
                  :class="getCellClass(dayObj, 'right')" @click="selectDate(dayObj)"
                  @mouseenter="handleMouseEnter(dayObj, index, 'right')">
                  <div class="ep-date-table-cell__text">{{ dayObj.date.getDate() }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 月份 -->
        <div v-else-if="type === 'month'" class="ep-month-table">
          <div v-for="monthObj in rightMonthList" :key="monthObj.date.getTime()" class="ep-month-table-cell"
            :class="{ 'selected': monthObj.isSelected, 'in-range': monthObj.isInRange, 'disabled': monthObj.isDisabled }"
            @click="selectMonth(monthObj)" @mouseenter="handleMouseEnter(monthObj, -1, 'right')">
            {{ monthObj.label }}
          </div>
        </div>
        <!-- 年份 -->
        <div v-else-if="type === 'year'" class="ep-year-table">
          <div v-for="yearObj in rightYearList" :key="yearObj.year" class="ep-year-table-cell"
            :class="{ 'selected': yearObj.isSelected, 'in-range': yearObj.isInRange, 'disabled': yearObj.isDisabled }"
            @click="selectYear(yearObj)" @mouseenter="handleMouseEnter(yearObj, -1, 'right')">
            {{ yearObj.year }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 支持 年、月，日，周，双面板范围
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('date-picker')
export default {
  name: ns.b()
}
</script>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: [String, Date, Array],
  placeholder: { type: String, default: '请选择范围' },
  format: { type: String, default: 'YYYY-MM-DD' },
  disabledDate: { type: Function, default: null },
  type: { type: String, default: 'week', validator: v => ['date', 'week', 'month', 'year'].includes(v) },
  range: { type: Boolean, default: true },
});

const emit = defineEmits(['update:modelValue', 'change']);

// --- 状态 ---
const showPicker = ref(false);
const datePickerRef = ref(null);
const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

const leftDate = ref(new Date());
const rightDate = ref(new Date());
const rangeStart = ref(null);
const rangeEnd = ref(null);
const hoverDate = ref(null);
const hoverWeekIndex = ref(-1);
const hoverPanel = ref('');

// --- 计算属性 ---
const displayValue = computed(() => {
  if (!props.modelValue || !Array.isArray(props.modelValue)) return '';
  return props.modelValue.map(d => formatDate(new Date(d), props.format)).join(' ~ ');
});

function getPanelTitle(date) {
  if (props.type === 'year') return `${date.getFullYear() - 5} - ${date.getFullYear() + 6}`;
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
}

function getISOWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// --- 核心：网格生成纯函数 ---
function generateCalendarDays(baseDate) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const days = [];
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push(createDayObject(new Date(year, month - 1, prevMonthLastDay - i), false));
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(createDayObject(new Date(year, month, i), true));
  }
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push(createDayObject(new Date(year, month + 1, i), false));
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

function generateMonthList(baseDate) {
  const year = baseDate.getFullYear();
  return monthNames.map((label, index) => {
    const d = new Date(year, index, 1);
    return createGenericObject(d, props.disabledDate ? props.disabledDate(d) : false);
  }).map((obj, index) => ({ ...obj, label }));
}

function generateYearList(baseDate) {
  const baseYear = baseDate.getFullYear();
  const years = [];
  for (let i = -5; i <= 6; i++) {
    const y = baseYear + i;
    const d = new Date(y, 0, 1);
    years.push({ ...createGenericObject(d, props.disabledDate ? props.disabledDate(d) : false), year: y });
  }
  return years;
}

// 统一处理范围状态计算
function createGenericObject(date, isDisabled) {
  const d = new Date(date); d.setHours(0, 0, 0, 0);
  let isSelected = false, isInRange = false;
  if (props.range) {
    const start = rangeStart.value ? new Date(rangeStart.value) : null;
    const end = rangeEnd.value || hoverDate.value;
    const endDate = end ? new Date(end) : null;
    if (start && endDate && d >= start && d <= endDate) isInRange = true;
    if (start && d.getTime() === start.getTime()) isSelected = true;
    if (endDate && d.getTime() === endDate.getTime()) isSelected = true;
  }
  return { date, isSelected, isInRange, isDisabled };
}

function createDayObject(date, isCurrentMonth) {
  const obj = createGenericObject(date, props.disabledDate ? props.disabledDate(date) : false);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return {
    ...obj, isCurrentMonth, isToday: obj.date.getTime() === today.getTime(),
    weekNumber: getISOWeekNumber(obj.date)
  };
}

// 动态获取左右面板数据
const leftCalendarDays = computed(() => generateCalendarDays(leftDate.value));
const rightCalendarDays = computed(() => generateCalendarDays(rightDate.value));
const leftMonthList = computed(() => generateMonthList(leftDate.value));
const rightMonthList = computed(() => generateMonthList(rightDate.value));
const leftYearList = computed(() => generateYearList(leftDate.value));
const rightYearList = computed(() => generateYearList(rightDate.value));

// 动态获取单元格样式类
function getCellClass(dayObj, panel) {
  const isHoverWeek = props.type === 'week' && hoverWeekIndex.value !== -1 && hoverPanel.value === panel;
  return {
    'current': dayObj.isCurrentMonth, 'today': dayObj.isToday, 'selected': dayObj.isSelected,
    'in-range': dayObj.isInRange, 'disabled': dayObj.isDisabled,
    'week-highlight': isHoverWeek || dayObj.isSelected
  };
}

// --- 交互方法 ---
function togglePicker() {
  showPicker.value = !showPicker.value;
  if (showPicker.value) {
    if (props.modelValue && Array.isArray(props.modelValue) && props.modelValue.length === 2) {
      rangeStart.value = new Date(props.modelValue[0]);
      rangeEnd.value = new Date(props.modelValue[1]);
      leftDate.value = new Date(props.modelValue[0]);
      rightDate.value = new Date(props.modelValue[1]);
      if (props.type === 'year') {
        rightDate.value.setFullYear(leftDate.value.getFullYear() + 12);
      } else if (leftDate.value.getMonth() === rightDate.value.getMonth() && leftDate.value.getFullYear() === rightDate.value.getFullYear()) {
        rightDate.value = new Date(leftDate.value.getFullYear(), leftDate.value.getMonth() + 1, 1);
      }
    } else {
      const now = new Date();
      leftDate.value = new Date(now.getFullYear(), now.getMonth(), 1);
      rightDate.value = props.type === 'year'
        ? new Date(now.getFullYear() + 12, now.getMonth(), 1)
        : new Date(now.getFullYear(), now.getMonth() + 1, 1);
      rangeStart.value = null; rangeEnd.value = null;
    }
  }
}

function clearDate() { emit('update:modelValue', []); emit('change', []); showPicker.value = false; }

function prevPeriod(panel) {
  const step = props.type === 'year' ? 12 : 1;
  if (panel === 'left') {
    leftDate.value = new Date(leftDate.value.getFullYear(), leftDate.value.getMonth() - step, 1);
    rightDate.value = new Date(leftDate.value.getFullYear(), leftDate.value.getMonth() + step, 1);
  } else {
    rightDate.value = new Date(rightDate.value.getFullYear(), rightDate.value.getMonth() - step, 1);
    leftDate.value = new Date(rightDate.value.getFullYear(), rightDate.value.getMonth() - step, 1);
  }
}

function nextPeriod(panel) {
  const step = props.type === 'year' ? 12 : 1;
  if (panel === 'left') {
    leftDate.value = new Date(leftDate.value.getFullYear(), leftDate.value.getMonth() + step, 1);
    rightDate.value = new Date(leftDate.value.getFullYear(), leftDate.value.getMonth() + step, 1);
  } else {
    rightDate.value = new Date(rightDate.value.getFullYear(), rightDate.value.getMonth() + step, 1);
    leftDate.value = new Date(rightDate.value.getFullYear(), rightDate.value.getMonth() - step, 1);
  }
}

function selectDate(dayObj) {
  if (dayObj.isDisabled || !dayObj.isCurrentMonth) return;
  if (!rangeStart.value || rangeEnd.value) {
    rangeStart.value = dayObj.date; rangeEnd.value = null; hoverDate.value = null;
  } else {
    if (dayObj.date < rangeStart.value) { rangeEnd.value = rangeStart.value; rangeStart.value = dayObj.date; }
    else { rangeEnd.value = dayObj.date; }
    emitRange();
  }
}

function selectMonth(monthObj) {
  if (monthObj.isDisabled) return;
  if (!rangeStart.value || rangeEnd.value) {
    rangeStart.value = monthObj.date; rangeEnd.value = null; hoverDate.value = null;
  } else {
    if (monthObj.date < rangeStart.value) { rangeEnd.value = rangeStart.value; rangeStart.value = monthObj.date; }
    else { rangeEnd.value = monthObj.date; }
    emitRange();
  }
}

function selectYear(yearObj) {
  if (yearObj.isDisabled) return;
  if (!rangeStart.value || rangeEnd.value) {
    rangeStart.value = yearObj.date; rangeEnd.value = null; hoverDate.value = null;
  } else {
    if (yearObj.date < rangeStart.value) { rangeEnd.value = rangeStart.value; rangeStart.value = yearObj.date; }
    else { rangeEnd.value = yearObj.date; }
    emitRange();
  }
}

function handleMouseEnter(dayObj, weekIndex, panel) {
  hoverPanel.value = panel;
  if (props.range && rangeStart.value && !rangeEnd.value) hoverDate.value = dayObj.date;
  if (props.type === 'week') hoverWeekIndex.value = weekIndex;
}

function emitRange() {
  const res = [rangeStart.value, rangeEnd.value];
  emit('update:modelValue', res); emit('change', res); showPicker.value = false;
}

function formatDate(date, formatStr) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return formatStr.replace('YYYY', year).replace('MM', month).replace('DD', day);
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
function handleClickOutside(event) {
  if (datePickerRef.value && !datePickerRef.value.contains(event.target)) showPicker.value = false;
}
</script>

<style scoped>
.ep-date-picker {
  position: relative;
  display: inline-block;
  width: 380px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", Arial, sans-serif;
  font-size: 14px;
  color: #606266;
  box-sizing: border-box;
}

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
  font-size: 14px;
}

.ep-input__suffix-icon:hover {
  color: #909399;
}

/* 双面板样式 */
.ep-picker-panel--double {
  display: flex;
  min-width: 560px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 2000;
  top: 100%;
  left: 0;
  margin-top: 5px;
}

.ep-picker-panel__body {
  flex: 1;
  padding: 10px;
}

.ep-picker-panel__body+.ep-picker-panel__body {
  border-left: 1px solid #e4e7ed;
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
  font-size: 14px;
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

/* 日期状态样式 */
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
  background-color: transparent;
}

/* 范围选择样式 (双面板联动核心) */
.ep-date-table-cell.in-range {
  background-color: #ebf5ff;
  border-radius: 0;
}

.ep-date-table-cell.range-start .ep-date-table-cell__text,
.ep-date-table-cell.range-end .ep-date-table-cell__text {
  background-color: #409eff;
  color: #fff;
}

.ep-date-table-cell.range-start {
  border-radius: 14px 0 0 14px;
}

.ep-date-table-cell.range-end {
  border-radius: 0 14px 14px 0;
}

/* 周选择特有样式 */
.ep-date-table th.week-number {
  color: #c0c4cc;
  font-weight: normal;
  font-size: 12px;
  width: 30px;
}

.ep-date-table td.week-number {
  cursor: default;
  color: #c0c4cc;
  font-size: 12px;
}

.week-number-text {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
}

/* 周整行悬停高亮 */
.week-row-hover td:not(.week-number) {
  background-color: #ebf5ff;
}

.week-row-hover td:first-child {
  border-radius: 14px 0 0 14px;
}

.week-row-hover td:last-child {
  border-radius: 0 14px 14px 0;
}

/* 周选中高亮 */
.ep-date-table-cell.week-highlight {
  background-color: #ebf5ff;
}

.ep-date-table-cell.week-highlight:first-child {
  border-radius: 14px 0 0 14px;
}

.ep-date-table-cell.week-highlight:last-child {
  border-radius: 0 14px 14px 0;
}

.ep-date-table-cell.week-highlight .ep-date-table-cell__text {
  background-color: #409eff;
  color: #fff;
}

/* 月份选择网格 */
.ep-month-table {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px 0;
}

.ep-month-table-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  transition: all 0.2s;
}

.ep-month-table-cell:hover:not(.disabled) {
  background-color: #f5f7fa;
  color: #409eff;
}

.ep-month-table-cell.selected {
  background-color: #409eff;
  color: #fff;
}

.ep-month-table-cell.in-range {
  background-color: #ebf5ff;
  color: #409eff;
}

.ep-month-table-cell.disabled {
  color: #e4e7ed;
  cursor: not-allowed;
  background-color: transparent;
}

/* 年份选择网格 */
.ep-year-table {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px 0;
}

.ep-year-table-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  transition: all 0.2s;
}

.ep-year-table-cell:hover:not(.disabled) {
  background-color: #f5f7fa;
  color: #409eff;
}

.ep-year-table-cell.selected {
  background-color: #409eff;
  color: #fff;
}

.ep-year-table-cell.in-range {
  background-color: #ebf5ff;
  color: #409eff;
}

.ep-year-table-cell.disabled {
  color: #e4e7ed;
  cursor: not-allowed;
  background-color: transparent;
}
</style>
