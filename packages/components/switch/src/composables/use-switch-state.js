import { computed, ref } from "vue";
export function useSwitchState(props, modelValue) {
  const checked = computed({
    get() {
      return modelValue.value;
    },
    set(val) {
      modelValue.value = val;
    },
  });
  const centerIcon = computed(() => {
    return props.checkedIcon && props.uncheckedIcon;
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

  return {
    checked,
    centerIcon,
    _loading,
  };
}
