import { useStyle } from "@ui-library/hooks";
import { computed } from "vue";
export function useModalState(props) {
  const uStyle = useStyle();

  const widthStyle = computed(() => {
    return uStyle.width(props.width);
  });

  return {
    widthStyle,
  };
}
