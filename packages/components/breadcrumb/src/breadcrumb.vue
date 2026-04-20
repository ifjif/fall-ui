<script>
import { useNamespace } from '@fall-ui/hooks'
import { h, provide } from 'vue'
const nsItem = useNamespace('breadcrumb-item')
const ns = useNamespace('breadcrumb')

export default {
  name: ns.b(),
  props: {
    // 分隔文本 ,支持 string, vnode(Object / Function)
    separator: {
      type: [String, Object, Function],
      default: '/'
    },
    // 分隔符图标（优先级高于文本）
    separatorIcon: {
      type: String, // 这里简化为 字符串类名，如：'el-icon-arrow-right'
      default: ''
    }
  },
  setup(props) {
    // 1.使用provide向下传递分隔符配置
    provide('separator', props.separator)
    provide('separatorIcon', props.separatorIcon)
  },
  render() {
    // 2. 获取默认插槽内容
    const slots = this.$slots.default ? this.$slots.default() : []
    // 3,过滤出 自定义的 breadcrumb-item组件
    // 这一步是为了防止插槽 里混入其他无关 div 或注释节点
    const items = slots.filter(item => {
      // 在vue3中，组件的name 通常挂载在type对象上
      return item.type && item.type.name === nsItem.b()
    })

    // 4.构建渲染上下文
    const children = []

    items.forEach((item, index) => {
      // 添加item本身
      children.push(item)

      // 如果不是最后一项，则添加分隔符
      if (index < items.length - 1) {
        let separatorContent = null
        // 智能判断分隔符
        // 优先级 separatorIcon > separator(vNode) > separator(String)
        if (this.separatorIcon) {
          // 情况A，使用图标类名
          separatorContent = h('i', { class: this.separatorIcon })
        } else if (typeof this.separator === 'string') {
          // 情况B 渲染普通文本
          separatorContent = this.separator
        } else {
          // 情况C 使用VNode(用户传入的 自定义组件)
          separatorContent = this.separator
        }
        children.push(
          h(
            'span',
            {
              class: 'my-breadcrumb__separator',
              style: { margin: '0 8px', color: '#c0c4cc', display: 'inline-flex', alignItems: 'center' }
            },
            separatorContent
          )
        )
      }
    })

    // 5.返回最终的 容器div
    return h('div', { class: 'my-breadcrumb' }, children)
  }
}
</script>
<style scoped>
.my-breadcrumb {
  font-size: 14px;
  line-height: 1;
  display: flex;
  /* 使用 flex 布局让项横向排列 */
  align-items: center;
}

/* 深度选择器，用于穿透修改子组件样式（如果需要） */
:deep(.my-breadcrumb-item) {
  white-space: nowrap;
}
</style>
