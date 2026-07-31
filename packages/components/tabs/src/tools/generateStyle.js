import { useNamespace } from "@fall-ui/hooks";

/*
 * 
    styles = {
      root:{
        color:
        bg_color:
        bd_color:
        btn_color:
        btn_bg_color:
        nav_bg_color:
        btn_bg_color:
        btn_color:
      },
      disabled:{
        color:
      }
      hover:{
        color:
      },
      active:{
        color:
        nav_bg_color:
        bar_color:
      },
    }
 *
 *
 */
const ns = useNamespace('tabs')
const com = `--${ns.b()}`

export function generateStyle(styles) {
  if (!styles) return {}

  const result = {}
  Object.entries(styles).forEach(([k, v]) => {

    switch (k) {
      case 'root': {
        result[`${com}-color`] = v['color']
        result[`${com}-bg-color`] = v['bg_color']
        result[`${com}-bd-color`] = v['bd_color']
        result[`${com}-new-btn-color`] = v['btn_color']
        result[`${com}-new-btn-bg-color`] = v['btn_bg_color']
        result[`${com}-nav-bg-color`] = v['nav_bg_color']
        result[`${com}-new-btn-bg-color`] = v['btn_bg_color']
        result[`${com}-new-btn-color`] = v['btn_color']
        break
      }
      case 'disabled': {
        result[`${com}-disabled-color`] = v[`color`]
        break
      }
      case 'hover': {
        result[`${com}-hover-color`] = v['color']
        break
      }
      case 'active': {
        result[`${com}-nav-active-bg-color`] = v['nav_bg_color']
        result[`${com}-active-color`] = v['color']
        result[`${com}-active-bar-bg-color`] = v['bar_color']
        break
      }
    }
  })

  return result
}
