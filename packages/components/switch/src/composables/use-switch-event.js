import { types } from "@ui-library/utils";
import { computed } from "vue";
export function useSwitchEvent(props, emit, _loading, checked) {
  const isFunction = computed(() => {
    return types().isFunction(props.beforeChange);
  });
  const clickEvent = (e) => {
    if (props.loading || props.disabled || isFunction.value) {
      e.preventDefault();
      if (isFunction.value && !props.disabled && !props.loading) {
        _loading.value = true;
        props.beforeChange().then(() => {
          setValue();
          _loading.value = false;
        }).catch(() => {
          _loading.value = false;
        });
      }
    }
  };
  const setValue = () => {
    checked.value = !checked.value;
  };
  const changeEvent = (e) => {
    emit("change", e.target.checked, e);
  };

  return {
    clickEvent,
    changeEvent,
  };
}
