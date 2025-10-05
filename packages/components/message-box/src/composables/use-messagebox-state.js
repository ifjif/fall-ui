import {
  FlButton as Button,
  FlIcon as Icon,
  FlMask as Mask,
} from "@ui-library/components";
import { typeIcons } from "@ui-library/icons";
import { themes, types } from "@ui-library/utils";
import { computed, isVNode } from "vue";
import { useStyle, useZIndex } from "@ui-library/hooks";
export function useMessageBoxState(props) {
  const uStyle = useStyle();
  const themeIcon = computed(() => {
    return typeIcons[props.type];
  });
  const themeType = computed(() => {
    return themes[props.type];
  });
  const isStringContent = computed(() => {
    return types().isString(props.content);
  });
  const isVNodeContent = computed(() => {
    return isVNode(props.content);
  });
  const { zIndex, nextZIndex } = useZIndex();
  const zIndexStyle = computed(() => {
    return uStyle.zIndex(zIndex.value);
  });
  const widthStyle = computed(() => {
    return uStyle.width(props.width);
  });

  return {
    themeIcon,
    themeType,
    Button,
    Icon,
    Mask,
    isStringContent,
    isVNodeContent,
    zIndexStyle,
    nextZIndex,
    widthStyle,
  };
}
