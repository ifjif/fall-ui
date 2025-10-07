import { computed, ref } from "vue";
import { useStyle } from "@fall-ui/hooks";
export function useFormItemState(props) {
  const uStyle = useStyle();
  const _required = computed(() => {
    if (!props.label) return false;

    return props.required;
  });
  const _colon = computed(() => {
    if (!props.label) return false;
    return props.colon;
  });
  const tip = ref("");
  const labelWidthStyle = computed(() => {
    return uStyle.width(props.labelWidth);
  });

  return {
    _required,
    _colon,
    tip,
    labelWidthStyle,
  };
}
