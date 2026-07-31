import { computed } from 'vue'
export function useDatePickerState(props, modelValue, formatDate) {

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

  return {
    displayValue
  }
}
