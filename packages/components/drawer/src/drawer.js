import Drawer from "./drawer.vue";
import { createVNode, render } from "vue";

const defaultOptions = { placement: "right", maskClose: true };

function createDrawer(params = {}) {
  const options = { ...defaultOptions, ...params };
  const container = document.createElement("div");
  const body = document.body;

  const vNode = createVNode(Drawer, {
    ...options,
    onClose() {
      options.onClose?.();
      render(null, container);
    },
  });
  render(vNode, container);

  body.appendChild(container.firstElementChild);
}

export { createDrawer };
