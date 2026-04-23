import { computed } from 'vue'

export function useTreeNodeStyle(props) {

  const indentStyle = computed(() => {
    const left = props.level * 20 + 'px'
    return {
      paddingLeft: left
    }
  })

  return { indentStyle }
}
