import { computed, ref } from 'vue'

export function useTreeNodeState(props) {
  const hasChildren = computed(() => props.node.children && props.node.children.length > 0)
  const expanded = ref(true)

  return {
    hasChildren,
    expanded
  }
}
