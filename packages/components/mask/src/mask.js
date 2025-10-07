import { createVNode, defineComponent, h, renderSlot } from "vue";
import { useNamespace } from "@fall-ui/hooks";
const ns = useNamespace("mask");

export default defineComponent({
  name: ns.b(),
  props: {
    mask: { type: Boolean, default: () => true },
    maskClose: { type: Boolean, default: () => true },
  },
  setup(props, { slots, emit }) {
    const close = () => {
      if (!props.maskClose) return;
      emit("close");
    };
    return () => {
      return createVNode(
        "div",
        {
          class: [ns.b()],
          style: [],
          onClick: close,
        },
        [
          h("span", { class: [props.mask ? ns.e("wrap") : ""] }),
          renderSlot(slots, "default"),
        ],
      );
    };
  },
});
