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
  (border, dashed) {
    #{getVarName('button',current,'color')}: var(#{getVarName('button', 'border-text-color')});
    #{getVarName('button',current,'bg-color')}: var(#{getVarName('button', 'border-bg-color')});
    #{getVarName('button',current,'bd-color')}: var(#{getVarName('button', 'border-border-color')});
  }
*/
export function generateStyle(comType, styles) {
  if (!styles) {
    return {}
  }
  const ns = "--fl"
  const com = comType
  const result = {}

  Object.entries(styles).forEach(([k, v]) => {
    switch (k) {
      case 'root': {
        result[`${ns}-${com}-bg-color`] = v['bg_color']
        result[`${ns}-${com}-border-color`] = v['bd_color']
        result[`${ns}-${com}-text-color`] = v['color']
        break
      }
      case 'hover': {
        result[`${ns}-${com}-hover-bg-color`] = v['bg_color']
        result[`${ns}-${com}-hover-border-color`] = v['bd_color']
        result[`${ns}-${com}-hover-text-color`] = v['color']
        break
      }
      case 'disabled': {
        result[`${ns}-${com}-disabled-bg-color`] = v['bg_color']
        result[`${ns}-${com}-disabled-border-color`] = v['bd_color']
        result[`${ns}-${com}-disabled-text-color`] = v['color']
        break
      }
      case 'active':
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
