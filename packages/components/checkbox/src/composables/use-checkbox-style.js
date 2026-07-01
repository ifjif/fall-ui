import { computed } from 'vue'
import { generateStyle } from '../tools/generateStyle'
import { useNamespace } from '@fall-ui/hooks'

const ns = useNamespace('checkbox')
const com = ns.b()
export function useCheckboxStyle(props) {
  const checkboxStyle = computed(() => {
    const styles = {
      ...generateStyle(props.styles)
    }
    styles[`--${com}-scale`] = props.scale
    return styles
  })

  return {
    checkboxStyle
  }
}
