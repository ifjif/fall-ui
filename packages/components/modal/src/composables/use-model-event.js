export function useModalEvent(emit, visible) {
  const cancelEvent = () => {
    emit("cancel");
    visible.value = false;
  };
  const confirmEvent = () => {
    emit("ok");
  };

  return {
    cancelEvent,
    confirmEvent,
  };
}
