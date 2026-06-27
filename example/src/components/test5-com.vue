<template>
  <div class="canvas" @click="canvasClick" @mouseup="onCanvasMouseUp" @mousemove="onCanvasMouseMove">
    <!-- 1. SVG 连线层 -->
    <svg class="svg-layer">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto-start-reverse">
          <polygon points="0 0, 10 3.5, 0 7" fill="#4169E1" />
        </marker>
      </defs>
      <!-- 正式连线 -->
      <path v-for="edge in edges" :key="edge.id" :d="getEdgePath(edge)" class="edge-path" marker-end="url(#arrowhead)"
        @mousedown="pathMousedown($event, edge.id)" @click.stop="selectEdge(edge.id)" />
      <!-- 拖拽中的临时连线 -->
      <path v-if="connection.active" :d="tempEdgePath" class="temp-edge" />
      <path v-if="selectedPathId" :d="selectedEdgePath" class="temp-edge" />
    </svg>
    <!-- 删除按钮，仅在连线选中时显示 -->
    <div v-if="selectedEdgeId" class="delete-btn" :style="deleteButtonStyle" @click="removeSelectedEdge">
      ×
    </div>

    <!-- 2. 节点层 -->
    <div v-for="node in nodes" :key="node.id" class="node" :style="{ left: node.x + 'px', top: node.y + 'px' }"
      @mousedown="onMouseDown($event, node)">
      <div class="node-label">{{ node.label }}</div>

      <!-- 3. 渲染端口 -->
      <!-- 注意：端口是绝对定位的，根据 offset 计算位置 -->
      <div v-for="port in node.ports" :key="port.id" class="port"
        :class="[port.type, { 'connected': isPortConnected(node.id, port.id) }]" :style="getPortStyle(port)"
        @mousedown.stop="onPortMouseDown($event, node, port)" @mouseup="onPortMouseUp($event,
          node, port)">
        <!-- 这里可以放图标或文字 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// --- 数据 ---
const nodes = ref([
  {
    id: 'node-1', label: '开始节点', x: 50, y: 150,
    ports: [
      { id: 'out-1', type: 'output', offset: { x: 1, y: 0.5 } }, // 右侧中间
      { id: 'in-2', type: 'input', offset: { x: 0.5, y: 0 } }, // 上中间
      { id: 'in-3', type: 'output', offset: { x: 0.5, y: 1 } } // 下中间
    ]
  },
  {
    id: 'node-2', label: '处理节点', x: 350, y: 150,
    ports: [
      { id: 'in-1', type: 'input', offset: { x: 0, y: 0.3 } },  // 左侧偏上
      { id: 'in-2', type: 'input', offset: { x: 0, y: 0.7 } },   // 左侧偏下
      { id: 'in-3', type: 'output', offset: { x: 1, y: 0.5 } }   // 右侧中间
    ]
  },
  {
    id: 'node-3', label: '处理节点', x: 350, y: 350,
    ports: [
      { id: 'in-1', type: 'input', offset: { x: 0, y: 0.3 } },  // 左侧偏上
      { id: 'in-2', type: 'input', offset: { x: 0, y: 0.7 } },   // 左侧偏下
      { id: 'in-3', type: 'output', offset: { x: 1, y: 0.5 } }   // 右侧中间
    ]
  },
  {
    id: 'node-4', label: '开始节点', x: 50, y: 350,
    ports: [
      { id: 'out-1', type: 'output', offset: { x: 1, y: 0.5 } }, // 右侧中间
      { id: 'int-2', type: 'input', offset: { x: 0.5, y: 0 } }, // 上中间
      { id: 'int-3', type: 'input', offset: { x: 0.5, y: 1 } } // 下中间
    ]
  },
])

//------------拖拽功能----------------
// 当前正在拖拽的节点
const draggingNode = ref(null)
// 鼠标点击时相对于左上角的偏移量
const dragOffset = ref({ x: 0, y: 0 })
const onMouseDown = (e, node) => {
  // 记录拖拽的是那个 节点
  draggingNode.value = node
  // 计算 鼠标点击位置相对于 节点左上角的 偏移
  // 这样拖拽节点不会 让 节点瞬移，让左上角对齐鼠标
  dragOffset.value = {
    x: e.clientX - node.x,
    y: e.clientY - node.y
  }
}

const edges = ref([]) // 存储连线 { sourceNodeId, sourcePortId, targetNodeId, targetPortId }
const selectedEdgeId = ref(null)

// 脱线
const selectedPathId = ref(null)
const selectedEdgePath = ref('')
const pathOffset = ref({})
const pathP = ref({})

//setTimeout(() => {
//  const edge1 = edges.value[0]
//  pathP.edge = edge1
//  const control = {
//    x1: 287,
//    y1: 317,
//    x2: 287,
//    y2: 305
//  }
//  pathP.edge.control = control
//}, 5000)

// 通过 nodeId得到 node
const getNode = (id) => {
  return nodes.value.find(node => node.id === id)
}
// 得到 指定节点的 port
const getNodePort = (node, portId) => {
  return node.ports?.find(port => port.id === portId)
}

// 选中连线
const selectEdge = (id) => {
  selectedEdgeId.value = id
}
// 计算删除按钮的位置
const deleteButtonStyle = computed(() => {
  if (!selectedEdgeId.value) return {}

  const edge = edges.value.find(e => e.id === selectedEdgeId.value)
  const sourceId = edge.sourceNodeId
  const sourcePortId = edge.sourcePortId
  const targetId = edge.targetNodeId
  const targetPortId = edge.targetPortId

  const source = getNode(sourceId)
  const sourcePort = getNodePort(source, sourcePortId)
  const target = getNode(targetId)
  const targetPort = getNodePort(target, targetPortId)

  // 计算 贝塞尔曲线 t = 0.5处的精确坐标
  const start = getPortPosition(source, sourcePort)
  const end = getPortPosition(target, targetPort)

  const midX = (start.x + end.x) / 2
  const midY = (start.y + end.y) / 2

  return {
    left: `${midX}px`,
    top: `${midY}px`,
    transform: `translate(-50%, -50%)` // 居中
  }
})
// 移除 edge
const removeSelectedEdge = () => {
  edges.value = edges.value.filter(e => e.id !== selectedEdgeId.value)
  selectedEdgeId.value = null

  console.log(edges.value)
}

// 连线状态
const connection = ref({
  active: false,
  sourceNodeId: null,
  sourcePortId: null,
  startX: 0,
  startY: 0,
  mouseX: 0,
  mouseY: 0
})

// --- 核心计算 ---

// 获取端口的绝对坐标
const getPortPosition = (node, port) => {
  const nodeWidth = 140 // 假设节点固定宽度
  const nodeHeight = 60 // 假设节点固定高度
  return {
    x: node.x + (nodeWidth * port.offset.x),
    y: node.y + (nodeHeight * port.offset.y)
  }
}

// 生成贝塞尔路径
const createPath = (x1, y1, x2, y2, control) => {
  //const dist = Math.abs(x2 - x1) * 0.5
  // 简单的水平贝塞尔曲线
  //return `M ${x1} ${y1} C ${x1 + dist} ${y1}, ${x2 - dist} ${y2}, ${x2} ${y2}`
  return `M ${x1} ${y1} C ${control.x1} ${control.y1}, ${control.x2} ${control.y2}, ${x2} ${y2}`
  //两点折线
  //return `M ${x1} ${y1} L ${x1 + dist} ${y1} L ${x2 - dist} ${y2} L ${x2} ${y2}`
}

const getControl = (x1, y1, x2, y2) => {
  const dist = Math.abs(x2 - x1) * 0.5

  return {
    x1: x1 + dist,
    y1,
    x2: x2 - dist,
    y2,
  }
}

// 计算正式连线
const getEdgePath = (edge) => {
  const sourceNode = nodes.value.find(n => n.id === edge.sourceNodeId)
  const sourcePort = sourceNode.ports.find(p => p.id === edge.sourcePortId)
  const targetNode = nodes.value.find(n => n.id === edge.targetNodeId)
  const targetPort = targetNode.ports.find(p => p.id === edge.targetPortId)

  const start = getPortPosition(sourceNode, sourcePort)
  const end = getPortPosition(targetNode, targetPort)

  const dist = Math.abs(end.x - start.y) * 0.5
  if (!edge.control) {
    edge.control = {
      x1: start.x + dist,
      y1: start.y,
      x2: end.x - dist,
      y2: end.y
    }
  }

  return createPath(start.x, start.y, end.x, end.y, edge.control)
}

// 计算临时连线
const tempEdgePath = computed(() => {
  if (!connection.value.active) return ''
  const control = getControl(
    connection.value.startX,
    connection.value.startY,
    connection.value.mouseX,
    connection.value.mouseY
  )
  return createPath(
    connection.value.startX,
    connection.value.startY,
    connection.value.mouseX,
    connection.value.mouseY,
    control
  )
})

// 辅助：获取端口样式
const getPortStyle = (port) => {
  // 简单的样式映射，实际项目中可能需要更复杂的计算
  return {
    left: `${port.offset.x * 100}%`,
    top: `${port.offset.y * 100}%`,
    transform: 'translate(-50%, -50%)' // 居中修正
  }
}

const isPortConnected = (nodeId, portId) => {
  return edges.value.some(e =>
    (e.sourceNodeId === nodeId && e.sourcePortId === portId) ||
    (e.targetNodeId === nodeId && e.targetPortId === portId)
  )
}

// --- 交互逻辑 ---

const onPortMouseDown = (e, node, port) => {
  // 1. 校验：只能从 output 端口开始连线
  if (port.type !== 'output') return

  const pos = getPortPosition(node, port)

  connection.value = {
    active: true,
    sourceNodeId: node.id,
    sourcePortId: port.id,
    startX: pos.x,
    startY: pos.y,
    mouseX: pos.x,
    mouseY: pos.y
  }
}

const onCanvasMouseMove = (e) => {
  if (selectedPathId.value) {
    const nX = e.clientX
    const nY = e.clientY
    console.log(nX, nY)

    const x1 = pathP.value.x1
    const y1 = pathP.value.y1
    const x2 = pathP.value.x2
    const y2 = pathP.value.y2
    const c = {
      x1: nX - pathOffset.value.ox1,
      y1: nY - pathOffset.value.oy1,
      x2: nX - pathOffset.value.ox2,
      y2: nY - pathOffset.value.oy2
    }

    pathP.value.control = c

    console.log(c)

    selectedEdgePath.value = `M ${x1} ${y1} C ${c.x1} ${c.y1} ${c.x2} ${c.y2}, ${x2} ${y2}`
  }
  // 更新拖动节点的 坐标
  if (draggingNode.value) {
    draggingNode.value.x = e.clientX - dragOffset.value.x
    draggingNode.value.y = e.clientY - dragOffset.value.y
  }

  if (!connection.value.active) return

  const canvas = e.currentTarget
  const rect = canvas.getBoundingClientRect()

  connection.value.mouseX = e.clientX - rect.left
  connection.value.mouseY = e.clientY - rect.top

}

// 如果不再具体端口上进行监听，需要进行全局查找
const onCanvasMouseUp = (e) => {
  if (pathP.value) {
    pathP.value.edge.control = pathP.value.control
  }
  selectedPathId.value = null
  // 鼠标松开，停止拖拽
  draggingNode.value = null

  if (!connection.value.active) return

  // 2. 碰撞检测：检查鼠标下方是否有目标端口
  // 注意：因为端口是绝对定位的，我们需要通过 elementFromPoint 获取
  const targetEl = document.elementFromPoint(e.clientX, e.clientY)
  const portEl = targetEl?.closest('.port') // 向上查找是否点到了端口

  if (portEl) {
    // 获取目标端口的数据（实际项目中建议用 data-attribute 或 Map 映射）
    const targetPortId = portEl.getAttribute('data-port-id') // 需要在模板中绑定
    const targetNodeId = portEl.parentElement.getAttribute('data-node-id') // 需要在模板中绑定

    // 这里为了演示简化，实际应通过 DOM 元素反查数据，或者在 mouseup 时传递数据
    // *修正*：由于 Vue 事件冒泡，我们可以在 port 上直接绑定 mouseup 事件，这样更准确
  }

  connection.value.active = false
}

// 优化：直接在端口上监听 mouseup，避免复杂的 DOM 查找
const onPortMouseUp = (e, node, port) => {
  e.stopPropagation() // 阻止冒泡到 canvas

  if (!connection.value.active) return

  // 校验：不能连自己，只能连 input
  if (connection.value.sourceNodeId === node.id) return
  if (port.type !== 'input') return

  // 重复不添加
  const isDuplicate = edges.value.some(edge =>
    edge.sourceNodeId === connection.value.sourceNodeId &&
    edge.sourcePortId === connection.value.sourcePortId &&
    edge.targetNodeId === node.id &&
    edge.targetPortId === port.id
  )

  if (isDuplicate) {
    console.log('连线已存在')
    return
  }

  // 建立连接
  edges.value.push({
    id: `e-${Date.now()}`,
    sourceNodeId: connection.value.sourceNodeId,
    sourcePortId: connection.value.sourcePortId,
    targetNodeId: node.id,
    targetPortId: port.id
  })

  connection.value.active = false

}


// 画布点击
const canvasClick = (e) => {
  // 取消选择的连线
  selectedEdgeId.value = null
}


const pathMousedown = (e, id) => {
  const eX = e.clientX
  const eY = e.clientY

  const edge = edges.value.find(edge => edge.id === id)
  console.log(edge)
  const sourceId = edge.sourceNodeId
  const sourcePortId = edge.sourcePortId
  const targetId = edge.targetNodeId
  const targetPortId = edge.targetPortId

  const source = getNode(sourceId)
  const sourcePort = getNodePort(source, sourcePortId)
  const target = getNode(targetId)
  const targetPort = getNodePort(target, targetPortId)

  const start = getPortPosition(source, sourcePort)
  const end = getPortPosition(target, targetPort)

  const x1 = start.x
  const y1 = start.y
  const x2 = end.x
  const y2 = end.y

  const dist = Math.abs(x2 - x1) * 0.5
  let c = {
    cx1: x1 + dist,
    cy1: y1,
    cx2: x2 - dist,
    cy2: y2
  }
  if (edge.control) {
    c.cx1 = edge.control.x1,
      c.cy1 = edge.control.y1,
      c.cx2 = edge.control.x2,
      c.cy1 = edge.control.y2
  }

  pathOffset.value = {
    ox1: eX - c.cx1,
    oy1: eY - c.cy1,
    ox2: eX - c.cx2,
    oy2: eY - c.cy2
  }

  pathP.value = {
    edge,
    x1, y1, x2, y2,
    ...c
  }

  selectedEdgePath.value = `M ${x1} ${y1} C ${c.cx1} ${c.cy1} ${c.cx2} ${c.cy2}, ${x2} ${y2}`


  //return `M ${x1} ${y1} C ${x1 + dist} ${y1}, ${x2 - dist} ${y2}, ${x2} ${y2}`

  /*
    *   获取 x1, y1 , x2,y2 ，这是不变的
    *
    *   这部分需要进行变化，根据鼠标进行
    *   C ${x1 + dist} ${y1}, ${x2 - dist} ${y2}
    *
    *
    */
  selectedPathId.value = id
}

</script>

<style scoped>
.canvas {
  position: relative;
  width: 100%;
  height: 500px;
  background: #f0f2f5;
  overflow: hidden;
}

.svg-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*pointer-events: none; */
  /* 穿透 SVG 让鼠标事件能点到下方的 DOM */
  z-index: 0;
}

.edge-path {
  stroke: #546099;
  stroke-width: 2px;
  fill: none;
  cursor: pointer;
}

.temp-edge {
  stroke: #4169E1;
  stroke-width: 2px;
  stroke-dasharray: 5;
  fill: none;
  opacity: 0.6;
}

.node {
  cursor: grab;
  position: absolute;
  width: 140px;
  height: 60px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  user-select: none;
}

/* 端口样式 */
.port {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  cursor: crosshair;
  transition: all 0.2s;
  z-index: 2;
}

/* 输出端口（右侧） */
.port.output {
  background: #4169E1;
  right: -6px;
  /* 修正位置，使其居中于边缘 */
}

/* 输入端口（左侧） */
.port.input {
  background: #52c41a;
  left: -6px;
}

.port:hover {
  transform: translate(-50%, -50%) scale(1.5);
  box-shadow: 0 0 10px rgba(65, 105, 225, 0.5);
}

.delete-btn {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #ff4d4f;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;

  &:hover {
    background-color: #ff7875;
  }
}
</style>
