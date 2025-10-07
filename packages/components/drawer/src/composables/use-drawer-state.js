import { useStyle } from "@fall-ui/hooks";
import { computed, isVNode } from "vue";
import { FlButton as Button, FlMask as Mask } from "@fall-ui/components";
import { types } from "@fall-ui/utils";
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
