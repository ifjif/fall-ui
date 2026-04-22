import { computed, ref } from 'vue'

export function useMenuItemState(props) {

  const submenuRef = ref(null)
  const ssubmenuRef = ref(null)
  // 有孩子
  const hasChildren = computed(() => props.menu.children && props.menu.children.length > 0)
  // 是否展开
  const isOpen = computed(() => props.openIndices.includes(props.menu.index))
  // 是否激活
  const isActive = computed(() => props.activeIndex === props.menu.index)

  return {
    submenuRef,
    ssubmenuRef,
    hasChildren,
    isOpen,
    isActive,
  }
}
