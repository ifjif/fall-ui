import { useNamespace } from "@fall-ui/hooks"
import { computed } from 'vue'

const ns = useNamespace('menu')
const b = `--${ns.b()}`
export function useMenuStyle(props) {
  const styles = computed(() => {
    const styles = {}
    styles[`${b}-width`] = props.width + 'px'
    styles[`${b}-collapse-width`] = props.collapseWidth + 'px'

    return styles
  })
  return { styles }
}
