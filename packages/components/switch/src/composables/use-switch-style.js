import { useNamespace } from '@fall-ui/hooks'
import { generateStyle } from '../tools/generateStyle'
import { computed } from 'vue'
const ns = useNamespace('switch')
const b = ns.b()

export function useSwitchStyle(props) {
  const switchStyle = computed(() => {
    const style = {
      ...generateStyle(props.styles)
    }
    style[`--${b}-scale`] = props.scale

    return style
  })

  return {
    switchStyle
  }
}
