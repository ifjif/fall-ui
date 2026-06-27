<template>
  <div class="flow-canvas" @mousedown="onCanvasMouseDown" @mousemove="onCanvasMouseMove" @mouseup="onCanvasMouseUp"
    @wheel.prevent="onCanvasWheel">
    <!-- 1. 世界容器：应用缩放和平移 -->
    <div class="world" :style="worldStyle">
      <!-- 网格背景 (可选，用于视觉辅助) -->
      <div class="grid-bg"></div>

      <!-- SVG 连线层 -->
      <svg class="svg-layer">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#546099" />
          </marker>
        </defs>
        <path v-for="edge in edges" :key="edge.id" :d="getEdgePath(edge)" class="edge-path"
          marker-end="url(#arrowhead)" />
      </svg>

      <!-- 节点层 -->
      <div v-for="node in nodes" :key="node.id" class="node" :style="{ left: node.x + 'px', top: node.y + 'px' }"
        @mousedown.stop="onNodeMouseDown($event, node)">
        <div class="node-content">{{ node.label }}</div>
        <!-- 端口 -->
        <div class="port output" @mousedown.stop="startConnection($event, node)"></div>
        <div class="port input" @mouseup.stop="completeConnection($event, node)"></div>
      </div>
    </div>

    <!-- 2. 工具栏：显示缩放比例和重置按钮 -->
    <div class="toolbar">
      <button @click="resetView">重置视图</button>
      <span>{{ Math.round(zoom * 100) }}%</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- 状态数据 ---
const nodes = ref([
  { id: '1', label: '节点 A', x: 100, y: 100 },
  { id: '2', label: '节点 B', x: 400, y: 200 }
])
const edges = ref([])

// 画布状态
const pan = ref({ x: 0, y: 0 }) // 平移量
const zoom = ref(1)             // 缩放比例

// 交互状态
const isDraggingCanvas = ref(false)
const dragStart = ref({ x: 0, y: 0 }) // 鼠标按下时的坐标

// --- 计算属性 ---
const worldStyle = computed(() => ({
  transform: `translate(${pan.value.x}px, ${pan.value.y}px) scale(${zoom.value})`
}))

// --- 核心逻辑：坐标转换 ---
// 将屏幕坐标转换为画布内的逻辑坐标
const screenToWorld = (sx, sy) => {
  return {
    x: (sx - pan.value.x) / zoom.value,
    y: (sy - pan.value.y) / zoom.value
  }
}

// --- 画布交互 ---

// 1. 缩放 (滚轮)
const onCanvasWheel = (e) => {
  // 控制缩放速度
  const delta = -e.deltaY * 0.001
  const newZoom = Math.min(Math.max(0.2, zoom.value + delta), 3) // 限制缩放范围 0.2x - 3x

  // 核心：以鼠标位置为中心进行缩放
  // 我们需要调整 pan 的值，使得鼠标下方的点在缩放前后保持屏幕位置不变
  const rect = e.currentTarget.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  // 计算鼠标在“世界”中的坐标（缩放前）
  const worldX = (mouseX - pan.value.x) / zoom.value
  const worldY = (mouseY - pan.value.y) / zoom.value

  // 更新缩放
  zoom.value = newZoom

  // 反向计算新的 pan，保持鼠标位置不动
  pan.value.x = mouseX - worldX * zoom.value
  pan.value.y = mouseY - worldY * zoom.value
}

// 2. 平移 (拖拽背景)
const onCanvasMouseDown = (e) => {
  // 只有点击空白处（或按住空格，这里简化为点击空白）才开始拖拽画布
  // 注意：因为节点绑定了 @mousedown.stop，所以点击节点不会触发这里
  isDraggingCanvas.value = true
  dragStart.value = { x: e.clientX, y: e.clientY }
  e.currentTarget.style.cursor = 'grabbing'
}

const onCanvasMouseMove = (e) => {
  if (isDraggingCanvas.value) {
    const dx = e.clientX - dragStart.value.x
    const dy = e.clientY - dragStart.value.y
    pan.value.x += dx
    pan.value.y += dy
    dragStart.value = { x: e.clientX, y: e.clientY }
  }
  // 这里可以继续写节点拖拽和连线拖拽的逻辑，注意要使用 screenToWorld 转换坐标
}

const onCanvasMouseUp = (e) => {
  isDraggingCanvas.value = false
  e.currentTarget.style.cursor = 'default'
}

const resetView = () => {
  pan.value = { x: 0, y: 0 }
  zoom.value = 1
}

// --- 以下为基础连线逻辑 (简化版) ---
const getEdgePath = (edge) => {
  const source = nodes.value.find(n => n.id === edge.source)
  const target = nodes.value.find(n => n.id === edge.target)
  // 简单计算路径...
  return `M ${source.x + 120} ${source.y + 30} L ${target.x} ${target.y + 30}`
}
const startConnection = (e, node) => { /* ... */ }
const completeConnection = (e, node) => { /* ... */ }
</script>

<style scoped>
.flow-canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f0f2f5;
  position: relative;
  cursor: default;
}

.world {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  /* 关键：以左上角为原点进行变换 */
  will-change: transform;
  /* 性能优化 */
}

/* 网格背景 */
.grid-bg {
  position: absolute;
  top: -5000px;
  left: -5000px;
  width: 10000px;
  height: 10000px;
  background-image: radial-gradient(#ddd 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 0;
  pointer-events: none;
}

.svg-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  z-index: 1;
  pointer-events: none;
}

.node {
  position: absolute;
  width: 120px;
  height: 60px;
  background: white;
  border: 1px solid #333;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
  display: flex;
  gap: 10px;
}
</style>
