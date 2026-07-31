import { computed, ref } from 'vue'
export function useAnchorState(props, flattenTree) {

  const flatData = computed(() => flattenTree(props.data))

  const anchorListRef = ref(null)
  const activeHref = ref('')


  return {
    flatData,
    anchorListRef,
    activeHref,
  }
}
