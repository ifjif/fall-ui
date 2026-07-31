import { inject } from 'vue'
import { TREE_KEY } from '../../constants'

export function useTreeNodeGroup() {
  const treeKey = inject(TREE_KEY, undefined)

  return {
    treeKey
  }
}
