import { useNamespace } from "@fall-ui/hooks";

/*
 *

    root: {
      bg_color: 
      color: 
      circle_bg_color: 
      icon_color: 
    },
    disabled: {
      bg_color: 
      color: 
    },
    loading: {
      bg_color: 
      color: 
    },
    active: {
      bg_color: 
      color: 
    },
    hover: {
      circle_bg_color: 
    }
 *
 *
 *
 *
 */
const ns = useNamespace('switch')
const com = `--${ns.b()}`

export function generateStyle(styles) {
  if (!styles) return {}

  const result = {}
  Object.entries(styles).forEach(([k, v]) => {
    switch (k) {
      case 'root': {
        result[`${com}-bg-color`] = v['bg_color']
        result[`${com}-text-color`] = v['color']
        result[`${com}-circle-bg-color`] = v['circle_bg_color']
        result[`${com}-center-icon-color`] = v['icon_color']
        break
      }
      case 'disabled': {
        result[`${com}-disabled-bg-color`] = v['bg_color']
        result[`${com}-disabled-text-color`] = v[`color`]
        break
      }
      case 'hover': {
        result[`${com}-circle-hover-bg-color`] = v['circle_bg_color']
        break
      }
      case 'loading': {
        result[`${com}-loading-bg-color`] = v['bg_color']
        result[`${com}-loading-text-color`] = v['color']
        break
      }
      case 'active': {
        result[`${com}-active-bg-color`] = v['bg_color']
        result[`${com}-active-text-color`] = v['color']
        break
      }
    }
  })

  return result
}
