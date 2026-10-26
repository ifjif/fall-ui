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
