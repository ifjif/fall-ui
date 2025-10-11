import { useStyle, useZIndex } from "@fall-ui/hooks";
import { computed } from "vue";
export function useModalState(props) {
  const uStyle = useStyle();
  const { zIndex, nextZIndex } = useZIndex()

  const widthStyle = computed(() => {
    return uStyle.width(props.width);
  });
  const zIndexStyle = computed(() => {
    return uStyle.zIndex(zIndex.value)
  })

  return {
    widthStyle,
    zIndexStyle,
    nextZIndex
  };
}
