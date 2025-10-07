import MessageNode from "./message.vue";
import { createVNode, render } from "vue";

const instances = [];
let instanceId = 0;

const defaultOptions = { type: "info", content: "" };

const initOptions = (params = {}) => {
  const options = { ...defaultOptions, ...params };

  return options;
};

const setId = (instance) => {
  const id = `message_${instanceId}`;
  instance.id = id;
  instance.component.props.id = id;
};

const closeMessage = (instance) => {
  instance.handler.close();
};

const closeAll = () => {
  if (instances.length === 0) {
    return;
  }
  for (const i = 0; i < instances.length;) {
    closeMessage(instances[0]);
  }
};

const getPrevBottomOffset = (id) => {
  const currentIdx = instances.findIndex((item) => item.id === id);
  if (currentIdx <= 0) {
    return 0;
  }
  const prev = instances[currentIdx - 1];
  return prev.component.setupState.bottomOffset;
};

function message(params = {}) {
  const instance = {};
  instanceId++;
  const options = initOptions(params);
  //得到body
  const body = document.body;
  //创建容器
  const container = document.createElement("div");
  //创建虚拟节点
  const vNode = createVNode(MessageNode, {
    ...options,
    onClose() {
      options.onClose?.();
      closeMessage(instance);
    },
  });
  render(vNode, container);
  const vm = vNode.component;
  Object.assign(instance, {
    id: params.id,
    component: vm,
    handler: {
      close() {
        vm.setupState.close();
        render(null, container);
      },
    },
  });
  instances.push(instance);
  setId(instance);
  body.appendChild(container.firstElementChild);
}

message.closeAll = closeAll;

export { getPrevBottomOffset, instances, message };
