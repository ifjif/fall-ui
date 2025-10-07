import { computed, ref } from "vue";
function useRadioState(
  props,
  groupValue,
  isGroup,
  modelValue,
  isFormItem,
  formItemKey,
) {
  const model = computed({
    get() {
      return isGroup ? groupValue.groupModel.value : modelValue.value;
    },
    set(val) {
      if (isGroup) {
        groupValue?.changeEvent?.(val);
      } else {
        modelValue.value = val;
      }
      if (isFormItem) formItemKey.observer("change");
    },
  });

  const isSelected = computed(() => {
    if (isGroup) {
      return groupValue.groupModel.value === props.value;
    }
    return model.value === props.value;
  });
  const loading = ref(false);

  const _loading = computed({
    get() {
      return props.loading || loading.value;
    },

    set(val) {
      loading.value = val;
    },
  });

  const _size = computed(() => {
    return props.size || groupValue?.size.value;
  });

  return {
    model,
    isSelected,
    _loading,
    _size,
  };
}

export { useRadioState };
