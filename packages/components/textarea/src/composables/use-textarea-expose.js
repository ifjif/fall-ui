import { useExpose } from "@fall-ui/hooks";
function useTextareaExpose(elem) {
  const { focusExpose, blurExpose, selectExpose } = useExpose(elem);

  return {
    focusExpose,
    blurExpose,
    selectExpose,
  };
}

export { useTextareaExpose };
