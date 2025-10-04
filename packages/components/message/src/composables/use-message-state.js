import { useStyle, useZIndex } from "@ui-library/hooks";
import { computed, ref } from "vue";
import { typeIcons } from "@ui-library/icons";
import { themes } from "@ui-library/utils";
import { getPrevBottomOffset } from "../message.js";

export function useMessageState(props) {
  const uStyle = useStyle();
  const { zIndex, nextZIndex } = useZIndex();
  const show = ref(false);
  const icon = computed(() => {
    return typeIcons[props.type];
  });
  const theme = computed(() => {
    return themes[props.type];
  });
  const height = ref(0);
  const messageRef = ref();

  const prevBottomOffset = computed(() => {
    const of = getPrevBottomOffset(props.id);
    return of;
  });

  const bottomOffset = computed(() => {
    return prevBottomOffset.value + props.offset + height.value;
  });

  const top = computed(() => {
    const offset = prevBottomOffset.value + props.offset;
    return uStyle.top(offset);
  });
  const zIndexStyle = computed(() => {
    return uStyle.zIndex(zIndex.value);
  });

  return {
    icon,
    theme,
    height,
    messageRef,
    top,
    show,
    zIndexStyle,
    nextZIndex,
    bottomOffset,
  };
}
