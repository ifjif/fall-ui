<template>
  <div class="ep-date-picker">
    <FlPopover :showArrow="false" :toBody="true" class="fl-test" :padding="0" placement="bottom-start">
      <template #reference>
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
      </template>

      <div class="ep-picker-panel">
        <!-- 快捷选项 -->
        <div class="ep-picker-panel__sidebar">
          <button class="ep-button--text" @click="handleShortcutClick(shortCut)" v-for="shortCut in props.shortCuts"
            :key="shortCut.text">
            {{ shortCut.text }}
          </button>
        </div>

        <FlDatePickerPanel :range="props.range" :type="props.type" v-model="modelValue"></FlDatePickerPanel>
      </div>

    </FlPopover>

  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
import InputPrefixIcon from './icons/input-prefix-icon.vue';
import InputSuffixIcon from './icons/input-suffix-icon.vue';
import { FlDatePickerPanel, FlPopover } from '@fall-ui/components'
const ns = useNamespace('date-picker')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { computed, watch } from 'vue'
const ns = useNamespace('date-picker')

const props = defineProps({
  placeholder: {
    type: String,
    default: '请选择日期'
  },
  type: {
    type: String,
    default: 'date',
    validator(v) {
      return ['date', 'dates', 'week', 'month', 'months', 'year', 'years'].includes(v)
    }
  },
  range: {
    type: Boolean,
    default: false,
  },
  shortCuts: {
    type: Array,
    default: [
      {
        text: '今天',
        value: () => {
          const d = new Date()
          return d
        }
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
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  }
})

const modelValue = defineModel({
  type: [String, Date, Array],
  default: ''
})

const emit = defineEmits(['change'])

const displayValue = computed(() => {
  if (!modelValue.value) return ''
  const values = modelValue.value

  if (Array.isArray(values)) {
    const result = values.map(v => {
      return formatDate(new Date(v), props.format)
    })
    return result.join(',')
  }

  return formatDate(new Date(values), props.format)
})

// 清空日期
const clearDate = () => {
  modelValue.value = ''
}
// 处理shortCut点击
const handleShortcutClick = (shortCut) => {
  modelValue.value = shortCut.value()
}

watch(() => modelValue.value, (v) => {
  emit('change', v)
})

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

.ep-picker-panel {
  display: flex;
}

.ep-picker-panel__sidebar {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-right: 1px solid #e4e7ed;
  width: 80px;
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

.ep-picker-panel__header {
  display: flex;
  justify-content: space-between;
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
</style>
