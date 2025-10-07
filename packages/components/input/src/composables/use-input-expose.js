import { useExpose } from "@fall-ui/hooks";
function useInputExpose(elem) {
  const { focusExpose, blurExpose, selectExpose } = useExpose(elem);

  return {
    focusExpose,
    blurExpose,
    selectExpose,
  };
}

export { useInputExpose };
