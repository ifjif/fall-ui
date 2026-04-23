<script>
import { useNamespace } from '@fall-ui/hooks';
import { useBreadcrumb } from './composables/use-breadcrumb.js'
import { h } from 'vue'
const ns = useNamespace('breadcrumb')
const nsItem = useNamespace('breadcrumb-item')
const {
  setItem
} = useBreadcrumb(nsItem.b())

export default {
  name: ns.b(),
  props: {
    separator: {
      type: [String, Object, Function],
      default: '/'
    }
  },
  setup() {
    // 如果是 声明式 写法，可以
    // 使用 provide 传递 分隔符给 子组件
    // provide('separator', this.separator)
    // 当前是 命令式，无需
  },
  render() {
    // 获取默认插槽内容
    const slots = this.$slots.default ? this.$slots.default() : []
    const items = []
    // 过滤出 所有 breadcrumb-item项
    // 即 options中的 name为 breadcrumb-item的name
    // options在组件的 type属性上
    // 只获取for组件的直接孩子
    slots.forEach(slot => {
      setItem(slot, items, 0, 1)
    })

    const lastIndex = items.length - 1
    const children = []

    // 为每个item 中间 插入 separator
    items.forEach((item, index) => {
      children.push(item)
      if (index !== lastIndex) {
        const com = h('span', { class: ns.e('separator') }, this.separator)
        children.push(com)
      }
    })

    // 渲染
    return h('div', { class: ns.b() }, children)
  }
}
</script>
