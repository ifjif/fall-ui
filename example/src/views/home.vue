<template>

  <div class="designer-container">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <button @click="addNode('start')">➕ 开始节点</button>
      <button @click="addNode('task')">📝 任务节点</button>
      <button @click="addNode('end')">🏁 结束节点</button>
      <div class="divider"></div>
      <button @click="clearCanvas" style="color: red">🗑️ 清空画布</button>
    </div>

    <!-- 画布区域 -->

    <div class="canvas-area" ref="canvasRef" @click="deselectAll">
      <fl-scrollbar>
        <!-- 1. SVG 连线层 (底层) -->
        <svg class="connections-layer">
          <path v-for="edge in edges" :key="edge.id" :d="getPath(edge)" class="connection-line"
            marker-end="url(#arrowhead)" />
        </svg>

        <!-- 2. 节点层 (上层) -->
        <div v-for="node in nodes" :key="node.id" class="node-item" :class="`node-${node.type}`"
          :style="{ left: node.x + 'px', top: node.y + 'px' }" @mousedown="onNodeMouseDown($event, node)"
          @click.stop="selectNode(node)">
          <div class="node-header">{{ node.label }}</div>
          <div class="node-body">ID: {{ node.id }}</div>

          <!-- 简单的锚点示意 (实际开发可做复杂交互) -->
          <div class="anchor output" @mousedown.stop="startConnection(node)"></div>
        </div>

        <!-- 正在拖拽的连线 (临时) -->
        <svg v-if="draggingEdge" class="temp-connection-layer">
          <path :d="getTempPath()" class="connection-line temp" />
        </svg>
      </fl-scrollbar>
    </div>


    <!-- 底部状态栏 -->
    <div class="status-bar">
      节点数: {{ nodes.length }} | 连线数: {{ edges.length }}
    </div>
  </div>

  <!-- 全局 SVG 定义，用于箭头 -->
  <svg style="position: absolute; width: 0; height: 0; overflow: hidden;">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#999" />
      </marker>
    </defs>
  </svg>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

// --- 状态定义 ---
const canvasRef = ref(null);
const nodes = reactive([]);
const edges = reactive([]);

// 拖拽相关状态
let draggedNode = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// 连线相关状态
let sourceNodeForConnection = null;
let draggingEdge = null; // { x1, y1, x2, y2 }

// --- 核心逻辑：添加节点 ---
const addNode = (type) => {
  const id = Date.now().toString();
  const labelMap = { start: '开始', task: '任务', end: '结束' };
  // 随机位置偏移，避免重叠
  const randomOffset = Math.floor(Math.random() * 50);

  nodes.push({
    id,
    type,
    label: labelMap[type],
    x: 100 + randomOffset,
    y: 100 + randomOffset,
    width: 140, // 预估宽度
    height: 60  // 预估高度
  });
};

// --- 核心逻辑：节点拖拽 ---
const onNodeMouseDown = (e, node) => {
  draggedNode = node;
  // 计算鼠标点击点相对于节点左上角的偏移
  dragOffsetX = e.offsetX;
  dragOffsetY = e.offsetY;

  // 绑定全局事件，防止鼠标移出节点后拖拽失效
  window.addEventListener('mousemove', onNodeMouseMove);
  window.addEventListener('mouseup', onNodeMouseUp);
};

const onNodeMouseMove = (e) => {
  if (!draggedNode || !canvasRef.value) return;

  const canvasRect = canvasRef.value.getBoundingClientRect();

  // 计算新坐标 (相对于画布容器)
  let newX = e.clientX - canvasRect.left - dragOffsetX;
  let newY = e.clientY - canvasRect.top - dragOffsetY;

  draggedNode.x = newX;
  draggedNode.y = newY;
};

const onNodeMouseUp = () => {
  draggedNode = null;
  window.removeEventListener('mousemove', onNodeMouseMove);
  window.removeEventListener('mouseup', onNodeMouseUp);
};

// --- 核心逻辑：连线绘制 (贝塞尔曲线) ---
// 计算两点之间的平滑曲线
const getPath = (edge) => {
  const source = nodes.find(n => n.id === edge.source);
  const target = nodes.find(n => n.id === edge.target);
  if (!source || !target) return '';

  // 计算锚点位置 (这里简化为：从源节点右侧中心 到 目标节点左侧中心)
  const startX = source.x + source.width;
  const startY = source.y + source.height / 2;
  const endX = target.x;
  const endY = target.y + target.height / 2;

  // 贝塞尔曲线控制点
  const controlPointOffset = Math.abs(endX - startX) * 0.5;
  const cp1x = startX + controlPointOffset;
  const cp1y = startY;
  const cp2x = endX - controlPointOffset;
  const cp2y = endY;

  return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
};

// --- 核心逻辑：创建连线交互 ---
const startConnection = (node) => {
  sourceNodeForConnection = node;
  window.addEventListener('mousemove', onConnectionMouseMove);
  window.addEventListener('mouseup', onConnectionMouseUp);
};

const onConnectionMouseMove = (e) => {
  if (!sourceNodeForConnection || !canvasRef.value) return;
  const canvasRect = canvasRef.value.getBoundingClientRect();
  draggingEdge = {
    x1: sourceNodeForConnection.x + sourceNodeForConnection.width,
    y1: sourceNodeForConnection.y + sourceNodeForConnection.height / 2,
    x2: e.clientX - canvasRect.left,
    y2: e.clientY - canvasRect.top
  };
};

const onConnectionMouseUp = (e) => {
  // 简单的碰撞检测：判断鼠标抬起位置是否有节点
  // 实际项目中建议使用更精确的 hit testing
  const targetElement = document.elementFromPoint(e.clientX, e.clientY);
  const nodeElement = targetElement?.closest('.node-item');

  if (nodeElement) {
    const targetId = nodeElement.getAttribute('data-id') || nodes.find(n => n.label === nodeElement.querySelector('.node-header').innerText)?.id; // 简单查找
    // 这里为了演示简化了查找逻辑，实际应绑定 data-id
    const targetNode = nodes.find(n => n.id === nodeElement.__vueParentComponent?.ctx?.props?.id || nodes.find(n => n.x == parseInt(nodeElement.style.left))) // 暴力匹配坐标

    if (targetNode && targetNode.id !== sourceNodeForConnection.id) {
      edges.push({
        id: `e_${Date.now()}`,
        source: sourceNodeForConnection.id,
        target: targetNode.id
      });
    }
  }

  sourceNodeForConnection = null;
  draggingEdge = null;
  window.removeEventListener('mousemove', onConnectionMouseMove);
  window.removeEventListener('mouseup', onConnectionMouseUp);
};

const getTempPath = () => {
  if (!draggingEdge) return '';
  const { x1, y1, x2, y2 } = draggingEdge;
  const cp1x = x1 + (x2 - x1) * 0.5;
  const cp2x = x1 + (x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
};

// --- 辅助功能 ---
const clearCanvas = () => {
  nodes.length = 0;
  edges.length = 0;
};

const selectNode = (node) => {
  console.log('选中节点:', node);
  // 这里可以扩展为弹出属性配置面板
};

const deselectAll = () => {
  // 取消选中逻辑
};
</script>

<style scoped>
/* 布局样式 */
.designer-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  background: #f0f2f5;
}

.toolbar {
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 15px;
  gap: 10px;
  z-index: 10;
}

.toolbar button {
  padding: 6px 12px;
  cursor: pointer;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
}

.canvas-area {
  position: relative;
  overflow: hidden;
  flex: 1;
  background-image: radial-gradient(#ddd 1px, transparent 1px);
  background-size: 20px 20px;
  /* 网格背景 */
}


/* SVG 连线样式 */
.connections-layer,
.temp-connection-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* 让鼠标事件穿透 SVG 到达节点 */
  z-index: 0;
}

.connection-line {
  fill: none;
  stroke: #999;
  stroke-width: 2px;
}

.connection-line.temp {
  stroke: #409eff;
  stroke-dasharray: 5;
}

/* 箭头定义 */
/* 注意：SVG marker 需要在 svg 标签内定义，这里为了简化写在 style 外或动态插入，
     实际使用时建议在 <svg> 内部写 <defs> */

/* 节点样式 */
.node-item {
  position: absolute;
  width: 140px;
  height: 60px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: move;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  user-select: none;
  transition: box-shadow 0.2s;
}

.node-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.node-start {
  background: #e6f7ff;
  border: 1px solid #91d5ff;
}

.node-task {
  background: #fff;
  border: 1px solid #d9d9d9;
}

.node-end {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
}

.node-header {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
}

.node-body {
  font-size: 12px;
  color: #666;
}

/* 锚点 */
.anchor {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #409eff;
  border-radius: 50%;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: crosshair;
  opacity: 0;
  /* 悬停显示 */
  transition: opacity 0.2s;
}

.node-item:hover .anchor {
  opacity: 1;
}

.status-bar {
  height: 30px;
  background: #fafafa;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
}
</style>
