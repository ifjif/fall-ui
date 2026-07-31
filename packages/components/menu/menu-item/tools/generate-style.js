/*
 *
    'bg-color':('default':getVarName('color', 'transparent')),
    'sub-bg-color':('default':getVarName('color', 'text', 'light', 8)),
    'color':('default':getVarName('color', 'text', 'dark', 9)),
    'hover-color':('default':getVarName('color', 'primary')),
    'hover-bg-color':('default':getVarName('color', 'text', 'light', 9)),
    'active-color':('default':getVarName('color', 'primary')),
    'active-bg-color':('default':getVarName('color', 'primary', 'light', 9)),
    'active-bar-color':('default':getVarName('color', 'primary')),
 *
 *
* styles
* {
*  root:{
*    bg_color:
*    sub_bg_color:
*    color
*  },
*  hover:{
*    bg_color:
*    color
*  },
*  active:{
*    bg_color:
*    color:
*    bar_color:
*  },
* }
*
*/

import { useNamespace } from "@fall-ui/hooks"
const ns = useNamespace('menu-item')
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
        result[`${com}-sub-bg-color`] = v['sub_bg_color']
        result[`${com}-color`] = v['color']
        break
      }
      case 'hover': {
        result[`${com}-hover-bg-color`] = v['bg_color']
        result[`${com}-hover-color`] = v['color']
        break
      }
      case 'active': {
        result[`${com}-active-bg-color`] = v['bg_color']
        result[`${com}-active-color`] = v['color']
        result[`${com}-active-bar-color`] = v['bar_color']
        break
      }
    }
  })

  return result
}
