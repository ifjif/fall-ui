import { useStyle } from "@ui-library/hooks";
import { computed, isVNode } from "vue";
import { FlButton as Button, FlMask as Mask } from "@ui-library/components";
import { types } from "@ui-library/utils";
export function useDrawerState(props) {
  const uStyle = useStyle();
  const widthStyle = computed(() => {
    return uStyle.width(props.width);
  });
  const heightStyle = computed(() => {
    let height = props.height;
    if (props.fixedScreen && ["top", "bottom"].includes(props.placement)) {
      height || (height = 400);
    }
    return uStyle.height(height);
  });

  const isStringContent = computed(() => {
    return types().isString(props.content);
  });
  const isVNodeContent = computed(() => {
    return isVNode(props.content);
  });

  return {
    Button,
    Mask,
    widthStyle,
    heightStyle,
    isStringContent,
    isVNodeContent,
  };
}
