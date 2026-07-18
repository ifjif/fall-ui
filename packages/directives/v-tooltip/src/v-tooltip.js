import { createVNode, render, toRaw, watchEffect } from 'vue'
import { RawPopover } from '@fall-ui/components'

// todo
// 添加 判断是否挂载到 body
const vFlToolTip = {
  // 注意，只有引用变了，才会触发
  // 如对象中某个字段变了，不会进行触发
  // 要想这样，请使用watchEffect
  // updated(el, binding) {
  //   // {value, oldValue} = binding ,两个值是一样的，不准确
  //   const { value } = binding
  //   const options = toRaw(value)
  //   //el._prevOptions = { ...el._options }
  //   //el._options = options
  //   if (el._popoverEl) {
  //     const container = el._popoverContainer
  //     const popoverVNode = createVNode(FlPopover, {
  //       title: options.title,
  //       content: options.content,
  //       placement: options.placement || 'top',
  //       showArrow: options.showArrow !== false,
  //       trigger: options.trigger || 'hover'
  //     })
  //     render(popoverVNode, container)
  //     el._updatePosition()
  //   }
  //   el._updateEvents(el._options, el._prevOptions)

  // },
  mounted(el, binding) {
    let toBody = binding.value.toBody
    if (toBody === undefined || toBody === null) {
      toBody = true
    }
    if (!toBody) {
      el.style.position = 'relative'
    }
    // 用于存储定时器
    let hideTimer = null

    // 用于监听 浮层的 size 变化，当发生后重新计算 position
    const resizeObserver = new ResizeObserver(() => {
      updatePosition()
    })

    // 定义渲染函数
    // 可挂载到 body中，或指令元素中
    const renderPopover = (options) => {
      // 创建一个隐藏的容器，用于挂载Popover实例
      const container = document.createElement('div')

      if (toBody) {
        document.body.appendChild(container)
      } else {
        el.appendChild(container)
      }
      const popoverVNode = createVNode(RawPopover, {
        title: options.title,
        content: options.content,
        placement: options.placement || 'top',
        showArrow: options.showArrow !== false,
        trigger: options.trigger || 'hover',
        padding: options.padding,
        footer: options.footer,
        onCancel: options.onCancel,
        onConfirm: options.onConfirm,
      },
        options.slots
      )
      render(popoverVNode, container)

      // 3.获取Popover组件的DOM元素
      el._popoverContainer = container
      el._popoverEl = container.lastElementChild
    }

    //4.计算位置函数
    // 不使用window位置计算
    // 而是相对于 el(指令所在元素) 位置的计算
    const updatePosition = () => {
      if (!el._popoverEl) return
      const triggerRect = el.getBoundingClientRect()
      const popoverRect = el._popoverEl.getBoundingClientRect()
      const computedStyle = window.getComputedStyle(el)
      const borderTop = parseFloat(computedStyle.borderTop)
      const borderLeft = parseFloat(computedStyle.borderLeft)
      let position = el._options.placement || 'top'
      let top = 0
      let left = 0;

      // 不够时，更改位置
      // todo:
      //    start时需要判断right bottom
      //    end时需要判断left top
      switch (position) {
        case 'top':
          if (triggerRect.top < popoverRect.height) {
            position = 'bottom'
          }
          break
        case 'top-start':
          if (triggerRect.top < popoverRect.height) {
            position = 'bottom-start'
          }
          break
        case 'top-end':
          if (triggerRect.top < popoverRect.height) {
            position = 'bottom-end'
          }
          break
        case 'bottom':
          if ((window.innerHeight - triggerRect.bottom) < popoverRect.height) {
            position = 'top'
          }
          break
        case 'bottom-start':
          if ((window.innerHeight - triggerRect.bottom) < popoverRect.height) {
            position = 'top-start'
          }
          break

        case 'bottom-end':
          if ((window.innerHeight - triggerRect.bottom) < popoverRect.height) {
            position = 'top-end'
          }
          break
        case 'left':
          if (triggerRect.left < popoverRect.width) {
            position = 'right'
          }
          break
        case 'left-start':
          if (triggerRect.left < popoverRect.width) {
            position = 'right-start'
          }
          break
        case 'left-end':
          if (triggerRect.left < popoverRect.width) {
            position = 'right-end'
          }
          break
        case 'right':
          if ((window.innerWidth - triggerRect.right) < popoverRect.width) {
            position = 'left'
          }
          break
        case 'right-start':
          if ((window.innerWidth - triggerRect.right) < popoverRect.width) {
            position = 'left-start'
          }
          break
        case 'right-end':
          if ((window.innerWidth - triggerRect.right) < popoverRect.width) {
            position = 'left-end'
          }
          break
      }


      // 计算触发元素的中心点
      const triggerCenterX = triggerRect.width / 2
      const triggerCenterY = triggerRect.height / 2

      switch (position) {
        case 'top':
          if (toBody) {
            top = triggerRect.top - popoverRect.height - 10 // 10px 间距
            left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
          } else {
            top = -popoverRect.height - 10
            left = (triggerRect.width - popoverRect.width) / 2
          }
          break
        case 'top-start':
          if (toBody) {
            top = triggerRect.top - popoverRect.height - 10 // 10px 间距
            left = triggerRect.left
          } else {
            top = -popoverRect.height - 10
            left = 0
          }
          break
        case 'top-end':
          if (toBody) {
            top = triggerRect.top - popoverRect.height - 10 // 10px 间距
            left = triggerRect.left - (popoverRect.width - triggerRect.width)
          } else {
            top = -popoverRect.height - 10
            left = triggerRect.width - popoverRect.width
          }
          break
        case 'bottom':
          if (toBody) {
            top = triggerRect.bottom + 10;
            left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
          } else {
            top = triggerRect.height + 10
            left = (triggerRect.width - popoverRect.width) / 2
          }
          break
        case 'bottom-start':
          if (toBody) {
            top = triggerRect.bottom + 10;
            left = triggerRect.left
          } else {
            top = triggerRect.height + 10
            left = 0
          }
          break
        case 'bottom-end':
          if (toBody) {
            top = triggerRect.bottom + 10;
            left = triggerRect.left - (popoverRect.width - triggerRect.width)
          } else {
            top = triggerRect.height + 10
            left = triggerRect.width - popoverRect.width
          }
          break
        case 'left':
          if (toBody) {
            top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
            left = triggerRect.left - popoverRect.width - 10;
          } else {
            top = (triggerRect.height - popoverRect.height) / 2
            left = - popoverRect.width - 10
          }
          break;
        case 'left-start':
          if (toBody) {
            top = triggerRect.top
            left = triggerRect.left - popoverRect.width - 10;
          } else {
            top = 0
            left = -popoverRect.width - 10
          }
          break;
        case 'left-end':
          if (toBody) {
            top = triggerRect.top - (popoverRect.height - triggerRect.height)
            left = triggerRect.left - popoverRect.width - 10;
          } else {
            top = triggerRect.height - popoverRect.height
            left = -popoverRect.width - 10
          }
          break;
        case 'right':
          if (toBody) {
            top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
            left = triggerRect.right + 10;
          } else {
            top = (triggerRect.height - popoverRect.height) / 2
            left = triggerRect.width + 10
          }
          break;
        case 'right-start':
          if (toBody) {
            top = triggerRect.top
            left = triggerRect.right + 10;
          } else {
            top = -2
            left = triggerRect.width + 10
          }
          break;
        case 'right-end':
          if (toBody) {
            top = triggerRect.top - (popoverRect.height - triggerRect.height)
            left = triggerRect.right + 10;
          } else {
            top = triggerRect.height - popoverRect.height
            left = triggerRect.width + 10
          }
          break;
      }
      if (['top-start', 'bottom-start'].includes(position)) {
        let arrowX = `${triggerCenterX}px`
        if (popoverRect.width * 2 < triggerRect.width) {
          arrowX = '50%';
        }
        // 将中心坐标作为css变量传递给popover组件
        el._popoverEl.style.setProperty('--arrow-x', arrowX)
      } else if (['top-end', 'bottom-end'].includes(position)) {
        const offsetWidth = popoverRect.width - triggerRect.width
        let arrowX = `${triggerCenterX + offsetWidth}px`
        if (popoverRect.width * 2 < triggerRect.width) {
          arrowX = '50%';
        }
        el._popoverEl.style.setProperty('--arrow-x', arrowX)
      } else if (['left-start', 'right-start'].includes(position)) {
        let arrowY = `${triggerCenterY}px`
        if (popoverRect.height * 2 < triggerRect.height) {
          arrowY = '50%';
        }
        el._popoverEl.style.setProperty('--arrow-y', arrowY)
      } else if (['left-end', 'right-end'].includes(position)) {
        const offsetHeight = popoverRect.height - triggerRect.height
        let arrowY = `${triggerCenterY + offsetHeight}px`
        if (popoverRect.height * 2 < triggerRect.height) {
          arrowY = '50%';
        }
        el._popoverEl.style.setProperty('--arrow-y', arrowY)
      }
      if (toBody) {
        // 考虑页面滚动(相对于内容 而不是 视口)
        top += window.scrollY
        left += window.scrollX
      } else {
        // 考虑 container父容器的: 
        // absolute不包含
        //  borderLeft和borderTop
        top -= borderTop
        left -= borderLeft
      }

      el._popoverEl.style.top = `${top}px`
      el._popoverEl.style.left = `${left}px`
    }

    // 5.处理显示和隐藏逻辑
    const show = () => {
      // 如果正在 倒计时隐藏，取消
      if (hideTimer) clearTimeout(hideTimer)

      // 开启前，如果已存在 返回
      if (el._popoverEl) {
        return
      }

      // 2.将虚拟节点渲染到容器
      renderPopover(el._options)
      updateEvents(el._options, el._prevOptions)
      updatePosition() // 显示前更新位置
      el._prevOptions = { ...el._options }
      //监听 size 变化，发生后重新计算position
      resizeObserver.observe(el._popoverEl)
    }

    const hide = () => {
      if (el._popoverCleanup) {
        // 100ms 延迟
        hideTimer = setTimeout(() => el._popoverCleanup(), 100)
      }
    }

    const popoverMouseenter = () => {
      if (hideTimer) clearTimeout(hideTimer)
    }


    // 定义事件更新函数
    const updateEvents = (options, prevOptions = {}) => {
      // 6.绑定事件监听器
      const trigger = options.trigger || 'hover' // hover | click
      const prevTrigger = prevOptions?.trigger
      if (trigger !== prevTrigger && el._popoverCleanupEvents) {
        el._popoverCleanupEvents()
      }

      if (trigger !== prevTrigger) {
        if (trigger === 'hover') {
          el.addEventListener('mouseenter', show)
          el.addEventListener('mouseleave', hide)

          // 监听 popover 本身
          el._popoverEl?.addEventListener('mouseenter', popoverMouseenter)
          el._popoverEl?.addEventListener('mouseleave', hide)

          el._popoverCleanupEvents = () => {
            el.removeEventListener('mouseenter', show)
            el.removeEventListener('mouseleave', hide)

            el._popoverEl?.removeEventListener('mouseenter', popoverMouseenter)
            el._popoverEl?.removeEventListener('mouseleave', hide)
          }
        } else if (trigger === 'click') {
          const clickHandler = (e) => {
            if (el._popoverEl?.contains(e.target)) return
            el._popoverEl ? hide() : show()
          }
          el.addEventListener('click', clickHandler)

          const outsideClickHandler = (e) => {
            // 引用本身不触发
            // 弹出本身不触发
            if (el.contains(e.target)) {
              return
            }

            if (!el._popoverEl) {
              return
            }

            // _popoverEl放在el中的
            // 第一步就拦截了
            // 挂载到body需要判断
            if (el._popoverEl.contains(e.target)) {
              return
            }

            hide()
          }

          const outsideScrollHanlder = (e) => {
            if (toBody && el._popoverEl) {
              console.log('滚动')
              updatePosition()
            }
          }

          // 捕获任意界面的滚动
          window.addEventListener('scroll', outsideScrollHanlder, { capture: true, passive: true })

          // 点击外部关闭
          document.addEventListener('click', outsideClickHandler)
          el._popoverCleanupEvents = () => {
            el.removeEventListener('click', clickHandler)
            document.removeEventListener('click', outsideClickHandler)
            window.removeEventListener('scroll', outsideScrollHanlder)
          }
        }
      }
    }

    el._popoverCleanup = () => {
      const container = el._popoverContainer
      if (container) {
        el._popoverEl?.removeEventListener('mouseenter', popoverMouseenter)
        el._popoverEl?.removeEventListener('mouseleave', hide)
        resizeObserver.disconnect()
        render(null, container)
        el._popoverEl = null
        container.parentNode.removeChild(container)
        el._popoverContainer = null
      }
    }

    const { value } = binding // 获取指令的值，即传入的配置对象

    watchEffect(() => {
      // 跟踪 value 的所有字段
      const options = toRaw({ ...value })
      el._prevOptions = el._options
      el._options = options
      if (el._popoverEl) {
        const container = el._popoverContainer
        const popoverVNode = createVNode(RawPopover, {
          title: options.title,
          content: options.content,
          placement: options.placement || 'top',
          showArrow: options.showArrow !== false,
          trigger: options.trigger || 'hover',
          padding: options.padding,
          footer: options.footer,
          onCancel: options.onCancel,
          onConfirm: options.onConfirm,
        }, options.slots)
        render(popoverVNode, container)
        updatePosition()
      }

      updateEvents(el._options, el._prevOptions)
    })
  },

  unmounted(el) {
    // 组件卸载时，清理事件监听
    if (el._popoverCleanupEvents) {
      el._popoverCleanupEvents()
    }
    // 清理组件
    if (el._popoverCleanup) {
      el._popoverCleanup()
    }
  }
}

export default vFlToolTip
