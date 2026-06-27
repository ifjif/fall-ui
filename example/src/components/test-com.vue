<template>
  <div class="canvas" ref="canvasRef" @mouseup="onMouseUp">
    <!-- svg 层，用来画线 -->
    <svg class="svg-layer">
      <!-- d属性定义了路径 M(起点) C(控制点1，控制点2，终点) -->
      <path :d="linePath" stroke="#4169e1" stroke-width="2" fill="none" />
    </svg>

    <!-- 节点层 -->
    <div v-for="node in nodes" :key="node.id" class="node" :style="{ left: node.x + 'px', top: node.y + 'px' }"
      @mousedown="onMouseDown($event, node)">
      {{ node.label }}
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const canvasRef = ref(null)

const nodes = ref([
  { id: '1', label: '节点A', x: 50, y: 100 },
  { id: '2', label: '节点B', x: 300, y: 150 },
])

// 当前正在拖拽的节点
const draggingNode = ref(null)
const dragOffset = ref({ x: 0, y: 0 }) // 鼠标点击相对于左上角的偏移

const onMouseDown = (e, node) => {
  // 记录拖拽的是哪个节点
  draggingNode.value = node

  // 2.计算鼠标点击位置相对于节点左上角的偏移
  // 这样拖拽节点 不会 “瞬移” 让左上角对齐鼠标
  dragOffset.value = {
    x: e.clientX - node.x,
    y: e.clientY - node.y
  }
}

const onMouseUp = () => {
  // 鼠标松开，停止拖拽
  draggingNode.value = null
}

// 注意，mousemove需要绑在 window或canvas上，防止鼠标移出节点后拖拽失效
window.addEventListener('mousemove', (e) => {
  if (draggingNode.value) {
    // 实时更新节点坐标
    draggingNode.value.x = e.clientX - dragOffset.value.x
    draggingNode.value.y = e.clientY - dragOffset.value.y
  }
})


// 计算连线坐标
const linePath = computed(() => {
  const nodeA = nodes.value.find(n => n.id === '1')
  const nodeB = nodes.value.find(n => n.id === '2')

  if (!nodeA || !nodeB) return ''

  const startX = nodeA.x + 120 // 假设节点宽120
  const startY = nodeA.y + 30  // 假设节点高60，中心是30
  const endX = nodeB.x
  const endY = nodeB.y + 30

  // 贝塞尔曲线控制点（让线更平滑）

  const dist = Math.abs(endX - startX) / 2
  const cp1x = startX + dist
  const cp2x = endX - dist

  // 返回 SVG Path 指令
  return `M ${startX} ${startY} C ${cp1x} ${startY}, ${cp2x} ${endY}, ${endX} ${endY}`
})
</script>
<style scoped>
path {
  stroke-dasharray: 10;
  /* 虚线长度 */
  animation: dash 30s linear infinite;
  /* 动画 */
}

@keyframes dash {
  to {
    stroke-dashoffset: -1000;
  }
}

.canvas {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  user-select: none;
  /* 防止拖拽时选中文字 */
}

.svg-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* 关键：让鼠标事件穿透 SVG，否则鼠标移到线上会触发 SVG 的事件 */
  z-index: 0;
}

.node {
  position: absolute;
  width: 120px;
  height: 60px;
  background: white;
  border: 1px solid #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.node:active {
  cursor: grabbing;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
