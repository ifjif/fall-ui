import MessageBox from "./message-box.vue";
import { createVNode, render } from "vue";

const defaultOptions = { type: "info", maskClose: false };

function createMessageBox(params = {}) {
  const options = { ...defaultOptions, ...params };
  const container = document.createElement("div");
  const body = document.body;

  const instance = {};
  const vNode = createVNode(MessageBox, {
    ...options,
    onClose() {
      options.onClose?.();
      render(null, container);
    },
  });

  render(vNode, container);
  body.appendChild(container.firstElementChild);
  const vm = vNode.component;

  Object.assign(instance, {
    close() {
      vm.exposed.close();
    },
  });

  return instance;
}

export { createMessageBox };
