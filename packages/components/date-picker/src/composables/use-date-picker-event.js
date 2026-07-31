export function useDatePickerEvent(modelValue) {

  // 处理shortCut点击
  const handleShortcutClick = (shortCut) => {
    modelValue.value = shortCut.value()
  }

  // 清空日期
  const clearDate = () => {
    modelValue.value = ''
  }

  return {
    handleShortcutClick,
    clearDate
  }
}
