import { instances } from "../message.js";
export function useMessageEvent(props, show) {
  const close = () => {
    show.value = false;
    const index = instances.findIndex((item) => item.id === props.id);
    if (index === -1) return;
    instances.splice(index, 1);
  };

  let stop;
  const start = () => {
    if (props.duration <= 0) {
      return;
    }
    stop = setTimeout(() => {
      props.onClose();
    }, props.duration);
  };

  const mouseenterEvent = () => {
    clearTimeout(stop);
  };

  return {
    close,
    start,
    mouseenterEvent,
  };
}
