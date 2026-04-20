import { createVNode, render, toRaw } from 'vue'
import { FlPopover } from '@fall-ui/components'

// 创建一个隐藏的容器，用于挂载Popover实例
const container = document.createElement('div')
document.body.appendChild(container)

const vFlPopover = {
  mounted(el, binding) {
    const { value } = binding // 获取指令的值，即传入的配置对象
    const options = toRaw(value)

    // 1.创建Popover 组件的虚拟节点
    const vnode = createVNode(FlPopover, {
      title: options.title,
      content: options.content,
      placement: options.placement || 'top',
      showArrow: options.showArrow !== false
    })

    // 2.将虚拟节点渲染到容器
    render(vnode, container)

    // 3.获取Popover组件的DOM元素
    popoverEl = container.lastElementChild

    // 初始隐藏
    popoverEl.style.visibility = 'hidden'
    popoverEl.style.opacity = '0'


    //4.计算位置函数
    const updatePosition = () => {
      const triggerRect = el.getBoundingClientRect()
      const popoverRect = popoverEl.getBoundingClientRect()
      const position = options.placement || 'top'
      let top = 0
      let left = 0;

      switch (position) {
        case 'top':
          top = triggerRect.top - popoverRect.height - 10 // 10px 间距
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
          break
        case 'bottom':
          top = triggerRect.bottom + 10;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
          break
        case 'left':
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.left - popoverRect.width - 10;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.right + 10;
          break;
      }
      // 考虑页面滚动(相对于内容 而不是 视口)
      top += window.scrollY
      left += window.scrollX

      popoverEl.style.top = `${top}px`
      popoverEl.style.left = `${left}px`
    }

    // 5.处理显示和隐藏逻辑
    const show = () => {
      updatePosition(popoverEl) // 显示前更新位置
      popoverEl.style.visibility = 'visible'
      popoverEl.style.opacity = '1'

    }

    const hide = () => {
      popoverEl.style.visibility = 'hidden'
      popoverEl.style.opacity = '0'
    }

    // 6.绑定事件监听器
    const trigger = options.trigger || 'hover' // hover | click
    if (trigger === 'hover') {
      el.addEventListener('mouseenter', show)
      el.addEventListener('mouseleave', hide)
    } else if (trigger === 'click') {
      el.addEventListener('click', () => {
        const isVisible = popoverEl.style.visibility === 'visible';
        isVisible ? hide() : show();
      })
      // 点击外部关闭
      document.addEventListener('click', e => {
        if (!el.contains(e.target) && !popoverEl.contains(e.target)) {
          hide();
        }
      })
    }

    // 将清理函数存储在元素上，以便在卸载时调用
    el._popoverCleanup = () => {
      if (trigger === 'click') {
        // 注意：这里无法精确移除之前绑定的匿名函数，实际项目中建议使用具名函数
        // 这是一个简化示例
      }
      render(null, container); // 卸载组件
    }
  },

  unmounted(el) {
    // 组件卸载时，清理副作用
    if (el._popoverCleanup) {
      el._popoverCleanup()
    }
  }
}

export default vFlPopover
