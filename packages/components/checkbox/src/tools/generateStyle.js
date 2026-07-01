import { useNamespace } from "@fall-ui/hooks";
/*
 * styles {
 *  root:{
 *    bg_color:
 *    bd_color:
 *    color:
 *  },
 *  disabled:{
 *    bg_color:
 *    bd_color:
 *    color:
 *    icon_color:
 *  },
 *  hover:{
 *    bg_color:
 *    bd_color:
 *    color:
 *  },
 *  selected:{
 *    bg_color:
 *    bd_color:
 *    color:
 *    icon_color:
 *  },
 *  loading:{ // 选中时，触发的加载样式,未选中时触发的加载样式为 disabled
 *    bg_color:
 *    bd_color:
 *    color:
 *  }
 * }
 *
 *
 *
 */
const ns = useNamespace('checkbox')
const com = `--${ns.b()}`
export function generateStyle(styles) {
  if (!styles) {
    return {}
  }

  const result = {}
  Object.entries(styles).forEach(([k, v]) => {
    switch (k) {
      case "root": {
        result[`${com}-bg-color`] = v['bg_color']
        result[`${com}-border-color`] = v['bd_color']
        result[`${com}-text-color`] = v['color']
        break
      }
      case "disabled": {
        result[`${com}-disabled-bg-color`] = v['bg_color']
        result[`${com}-disabled-border-color`] = v['bd_color']
        result[`${com}-disabled-text-color`] = v['color']
        result[`${com}-disabled-icon-color`] = v['icon_color']
        break
      }
      case "hover": {
        result[`${com}-hover-bg-color`] = v['bg_color']
        result[`${com}-hover-border-color`] = v['bd_color']
        result[`${com}-hover-text-color`] = v['color']
        break
      }
      case "selected": {
        result[`${com}-selected-bg-color`] = v['bg_color']
        result[`${com}-selected-border-color`] = v['bd_color']
        result[`${com}-selected-text-color`] = v['color']
        result[`${com}-selected-color`] = v['icon_color']
        break
      }
      case "loading": {
        result[`${com}-loading-bg-color`] = v['bg_color']
        result[`${com}-loading-border-color`] = v['bd_color']
        result[`${com}-loading-text-color`] = v['color']
        break
      }
    }
  })

  return result
}
