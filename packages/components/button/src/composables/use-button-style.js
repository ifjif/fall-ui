import { computed } from "vue"
/*
* styles
* {
*  root:{
*    bg_color:
*    bd_color
*    color
*  },
*  hover:{
*    bg_color:
*    bd_color
*    color
*  },
*  disabled:{
*    bg_color:
*    bd_color
*    color
*  },
* }
*
*
 */
import { generateStyle } from "../tools/generate-style"
import { useNamespace } from "@fall-ui/hooks"

const ns = useNamespace('button')
const com = ns.b()
export function useButtonStyle(props) {
  const btStyle = computed(() => {
    const styles = {
      ...generateStyle(props.styles)
    }
    styles[`--${com}-scale`] = props.scale

    return styles
  })

  return {
    btStyle
  }
}
