import { computed } from 'vue'
import { useNamespace } from "@fall-ui/hooks";
import { generateStyle } from '../tools/generateStyle';

const ns = useNamespace("checkbox")
const com = `--${ns.b()}`

export function useRadioStyle(props) {
  const radioStyle = computed(() => {
    const styles = {
      ...generateStyle(props.styles)
    }
    styles[`${com}-scale`] = props.scale

    return styles
  })

  return {
    radioStyle
  }
}
