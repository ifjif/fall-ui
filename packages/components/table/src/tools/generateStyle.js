import { useNamespace } from "@fall-ui/hooks";

/*
 *
 *
 styles = {
    root: {
      color: '',
      bd_color: '',
      header_tr_bg_color: '',
      body_tr_bg_color: '',
      filter_icon_color:'',
      filter_icon_badge_color:'',
      tree_icon_color:''
    },
    fixed:{
      th_bg_color:'',
      tr_bg_color: ''
    },
    active: {
      sort_icon_color:'',
      tree_icon_color:''
    },
    hover: {
      body_tr_bg_color:'',
      filter_icon_color:''
    },
    stripe:{
       body_tr_bg_color:''
    }
  }
 *
 */
const ns = useNamespace('table')
const com = `--${ns.b()}`

export function generateStyle(styles) {
  if (!styles) return {}

  const result = {}
  Object.entries(styles).forEach(([k, v]) => {
    switch (k) {
      case 'root': {
        result[`${com}-color`] = v['color']
        result[`${com}-bd-color`] = v['bd_color']
        result[`${com}-header-tr-bg-color`] = v['header_tr_bg_color']
        result[`${com}-body-tr-bg-color`] = v['body_tr_bg_color']
        result[`${com}-filter-icon-color`] = v['filter_icon_color']
        result[`${com}-filter-icon-badge-color`] = v['filter_icon_badge_color']
        result[`${com}-tree-icon-color`] = v['tree_icon_color']
        break
      }
      case 'fixed': {
        result[`${com}-fixed-th-bg-color`] = v['th_bg_color']
        result[`${com}-fixed-tr-bg-color`] = v['tr_bg_color']
        break
      }
      case 'hover': {
        result[`${com}-body-tr-hover-bg-color`] = v['body_tr_bg_color']
        result[`${com}-filter-icon-hover-color`] = v['filter_icon_color']
        break
      }
      case 'active': {
        result[`${com}-sort-icon-active-color`] = v['sort_icon_color']
        result[`${com}-tree-icon-expanded-color`] = v['tree_icon_color']
        break
      }
      case 'stripe': {
        result[`${com}-body-tr-stripe-bg-color`] = v['body_tr_bg_color']
      }
    }
  })

  return result
}
