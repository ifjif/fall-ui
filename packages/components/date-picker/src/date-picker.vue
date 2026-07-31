<template>
  <div :class="[ns.b()]">
    <FlPopover :showArrow="false" class="fl-test" :padding="0" placement="bottom-start">
      <template #reference>
        <!-- 输入框 -->
        <div :class="[ns.e('input-wrapper')]" @click="togglePicker">
          <span :class="[ns.e('input-prefix-icon')]">
            <InputPrefixIcon />
          </span>
          <input :class="[ns.e('input-inner')]" type="text" :value="displayValue" :placeholder="placeholder" readonly />
          <span :class="[ns.e('input-suffix-icon')]" v-if="modelValue" @click.stop="clearDate">
            <InputSuffixIcon />
          </span>
        </div>
      </template>

      <div :class="ns.e('panel-body')">
        <!-- 快捷选项 -->
        <div :class="[ns.e('panel-sidebar')]">
          <button :class="[ns.e('sidebar-button')]" @click="handleShortcutClick(shortCut)"
            v-for="shortCut in props.shortCuts" :key="shortCut.text">
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
import { useDatePicker } from './composables/use-date-picker';
const ns = useNamespace('date-picker')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { watch } from 'vue'
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

const {
  displayValue,
  handleShortcutClick,
  clearDate
} = useDatePicker(props, modelValue)


watch(() => modelValue.value, (v) => {
  emit('change', v)
})

</script>
