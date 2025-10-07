import {
  FlButton as Button,
  FlIcon as Icon,
  FlMask as Mask,
} from "@fall-ui/components";
import { typeIcons } from "@fall-ui/icons";
import { themes, types } from "@fall-ui/utils";
import { computed, isVNode } from "vue";
import { useStyle, useZIndex } from "@fall-ui/hooks";
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
