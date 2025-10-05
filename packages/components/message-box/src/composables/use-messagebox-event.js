export function useMessageBoxEvent(props, emit) {
  const close = () => {
    props.onClose();
  };
  const cancelEvent = () => {
    emit("cancel");
    close();
  };
  const confirmEvent = () => {
    emit("ok");
  };

  return {
    close,
    cancelEvent,
    confirmEvent,
  };
}
