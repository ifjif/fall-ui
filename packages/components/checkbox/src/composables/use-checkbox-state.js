import { computed, ref } from "vue";
import { types } from "@ui-library/utils";
function useCheckboxState(
  props,
  groupValue,
  isGroup,
  modelValue,
  formItemKey,
  isFormItem,
) {
  const model = computed({
    get() {
      return isGroup ? groupValue.groupModel.value : modelValue.value;
    },
    set(val) {
      if (isGroup && Array.isArray(val)) {
        groupValue?.changeEvent?.(val);
      } else {
        modelValue.value = val;
      }
      if (isFormItem) formItemKey.observer("change");
    },
  });

  const isSelected = computed(() => {
    const value = model.value;

    if (types().isBoolean(value)) {
      return value;
    }

    if (types().isArray(value)) {
      return value.includes(props.value);
    }

    return false;
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

export { useCheckboxState };
