## 0.3.4 - 2026-11-11

### 修复(Fixed)

- fl-virtual-list
  滑轮向上滚动，向下回滚问题

## 0.3.2 - 2026-11-10

### 修复(Fixed)

- fl-virtual-list
  滚动到底部时，最后一条不再可视最底部

### 增加(Added)

- fl-virtual-list
  增加暴露方法
  getAnchor(): 获取一条完全可见项, 没有时取渲染中第一条
  restoreAnchor(anchor)=>Promise :恢复锚点到指定位置
  增加特殊行为
  底部吸附（有新内容加入，自动滚动到最底部）

## 0.3.1 - 2026-11-09

### 修复(Fixed)

- fl-scrollbar
  滚动到最底部(scrollToBottom(changed))和滚动到最右边(scrollToRight(false))时，参数设置为true，在滚动后容器变化后重新滚动到最新位置, 会进行设置scrollToBottomForChange和scrollToRightForChange
  原先在resize中进行，调用 scrollToBottomForChange和scrollToRightForChange,如果它们触发了，但是resize没有触发,会导致之后resize触发时，调用scrollToBottomForChange和scrollToRightForChange,造成为期待的影响.
  改进在scrollToBottom和scrollToRight当changed为true且resizeChange没有时，使用三层requestAnimationFrame来重新触发scrollToBottom或scrollToRight, 因为第二层是容器变化成，需要在变化后重新滚动所有在第三层。

### 增加(Added)

- fl-scrollbar
  内部添加`<div ref="sentinelRef"></div>`底部哨兵节点, 并使用IntersectionObserver进行监听。
  当快出现在容器可视范围(当前为距底部100px)内是触发bottomPrev事件

- fl-table
  添加height和width属性

- fl-virtual-list
  添加暴露方法
  scrollToTop
  scrollTop
  scrollToBottom
  scrollToLeft
  scrollLeft
  scrollToRight
  getScrollContainer

  添加暴露事件
  resize
  top
  bottom
  right
  left

## 0.3.0 - 2026-11-08

### 修复(Fixed)

- fl-scrollbar
  往下拖拽时超出maxScrollTop问题
  往右拖拽时超出maxScrollLeft问题
  先前的thumbHeightRatio和thumbWidthRate新的相等时成为0.101问题,预期的是先前的是0.1并且新计算的也是0.1这时才成为0.101

- fl-table
  border-collapse:collapse在不同浏览器行为不同

### 增加(Added)

- fl-scrollbar
  showX 属性，是否展示水平滚动条
  scrollTop和scrollLeft 方法，滚动到指定位置
- fl-table
  filterActions和sortActions属性，自定义字段本地的过滤和排序
- fl-virtual-list
  新增虚拟列表组件

### 修改(alter)

- fl-table
  header和body 分离，采用两个table

## 0.2.13 - 2026-10-26

### 修复(Fixed)

- fl-scrollbar
  thumbHeightRatio 到达最大0.1
  thumbWidthRate 到达最大0.1
  由于computed不会监听 domRef.value.ClientHeight/domRef.value.ClientHeight
  而内部的thumbHeightRatio和thumbWidthRate又一直是0.1
  导致 thumbHeight和thumbWidth的computed不触发
  从而让虚拟滚动栏的位置信息不准确

  解决：
  让thumbHeightRatio和thumbWidthRate在0.1和0.101之间切换

## 0.2.12 - 2026-10-24

### 修复(Fixed)

- fl-scrollbar中 vertical-bar不随父容器变化，去掉inner_content的父content,让其直接在scrollContainer中

## 0.2.11 - 2026-10-23

### 修复(Fixed)

- fl-textarea 中wrapper中设置min-width:0,让fl-scrollbar生效

## 0.2.10 - 2026-10-23

### 修复(Fixed)

- fl-scrollbar中 自动滚动和拖拽滚动同时存在问题
  当进行自动滚动时，会取消拖拽滚动

## 0.2.9 - 2026-09-01

### 修复(Fixed)

- fl-menu中active没有使用keyProp

## [0.2.8] - 2026-09-01

### 新增(Added)

- fl-menu可以指定活跃key的名字, 原先只能index充当，先可以指定名：如id
  属性：keyProp
- fl-menu中的icon可以选择展示位置, top,center,end
  属性：headerPosition
- fl-modal中 model的文档

### 修复(Fixed)

- fl-menu中icon所在的容器可以根据孩子进行伸缩
- fl-menu中，select事件可以返回选中的 item,而不是key
