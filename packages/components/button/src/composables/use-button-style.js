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
*  active:{
*    bg_color:
*    bd_color
*    color
*  }
* }
*
*size
*horizontal-padding
*font-size
*round-size
*border-size
*border-color
*bg-color
*text-color
*hover-bg-color
*hover-border-color
*hover-text-color
*disabled-bg-color
*disabled-border-color
*disabled-text-color
*border-bg-color
*border-border-color
*border-text-color
*text-text-color
*text-border-color
*text-bg-color
*text-hover-bg-color
*text-hover-border-color
*text-disabled-text-color
*
*
*
*
*
*
*
*
*
*
 */
import { generateStyle } from "../generate-style"
export function useButtonStyle(props) {
  const btStyle = computed(() => {
    return {
      '--btn-scale': props.scale,
      ...generateStyle('button', props.styles)
    }
  })

  return {
    btStyle
  }
}
