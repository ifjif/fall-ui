import { computed, ref } from "vue";
//global
let globalZIndex = 3000;
let growth = ref(0);
const nextZIndex = () => {
  return growth.value++;
};

export const useZIndex = () => {
  const zIndex = computed(() => globalZIndex + growth.value);
  return {
    zIndex,
    nextZIndex,
  };
};
