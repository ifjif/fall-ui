import { computed, shallowRef } from "vue";
import { FlCloseCircle as clearIcon } from "@ui-library/icons";
import { useStyle } from "@ui-library/hooks";
function useTextareaState(props, modelValue) {
  const uStyle = useStyle();
  const _ref = shallowRef(null);
  const inputWidth = computed(() => {
    return uStyle.width(props.width);
  });
  const textLength = computed(() => {
    return modelValue.value ? modelValue.value.length : 0;
  });
  const showCount = computed(() => {
    return props.maxlength && props.count;
  });
  const isSuffix = computed(() => {
    return props.clear || showCount.value;
  });

  return {
    _ref,
    isSuffix,
    clearIcon,
    textLength,
    showCount,
    inputWidth,
  };
}

export { useTextareaState };
