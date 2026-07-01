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
*/

import { useNamespace } from "@fall-ui/hooks"
const ns = useNamespace('button')
const com = `--${ns.b()}`
export function generateStyle(styles) {
  if (!styles) {
    return {}
  }
  const result = {}

  Object.entries(styles).forEach(([k, v]) => {
    switch (k) {
      case 'root': {
        result[`${com}-bg-color`] = v['bg_color']
        result[`${com}-border-color`] = v['bd_color']
        result[`${com}-text-color`] = v['color']
        break
      }
      case 'hover': {
        result[`${com}-hover-bg-color`] = v['bg_color']
        result[`${com}-hover-border-color`] = v['bd_color']
        result[`${com}-hover-text-color`] = v['color']
        break
      }
      case 'disabled': {
        result[`${com}-disabled-bg-color`] = v['bg_color']
        result[`${com}-disabled-border-color`] = v['bd_color']
        result[`${com}-disabled-text-color`] = v['color']
        break
      }
    }
  })

  return result

  /*
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
    */
}
