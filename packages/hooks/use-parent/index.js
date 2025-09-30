import { getCurrentInstance } from 'vue'
import { useNamespace } from '../use-namespace/index'

function useParent(name) {
  const instance = getCurrentInstance()
  const parent = instance.parent

  const group = () => {
    const parentname = useNamespace(name).b()
    return parent.proxy.$options.name === parentname
  }

  const props = (prop) => {
    return parent.props?.[prop] || false
  }

  return {
    group,
    props
  }
}

export { useParent }
