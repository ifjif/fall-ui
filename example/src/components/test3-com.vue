<template>
  <div class="canvas">
    <svg class="svg-layer">
      <!-- 1. 定义箭头标记 -->
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#546099" />
        </marker>
      </defs>

      <!-- 2. 绘制连线 -->
      <!-- marker-end 属性用于添加箭头 -->
      <path :d="edgePath" stroke="#546099" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
    </svg>

    <!-- 节点层 (用于视觉参考) -->
    <div class="node start">节点 A</div>
    <div class="node end">节点 B</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 假设这是两个节点的坐标（相对于 SVG 容器）
const startNode = { x: 100, y: 100, width: 120, height: 60 }
const endNode = { x: 400, y: 200, width: 120, height: 60 }

// --- 核心算法：计算折线路径 ---
const edgePath = computed(() => {
  // 1. 确定起点和终点（这里取节点的中心或边缘）
  const startX = startNode.x + startNode.width // 从右侧出发
  const startY = startNode.y + startNode.height / 2
  const endX = endNode.x // 连到左侧
  const endY = endNode.y + endNode.height / 2

  // 2. 计算折线控制点
  // 策略：水平偏移量，取两节点距离的一半，或者固定值（如 50px）
  const offset = Math.abs(endX - startX) / 2

  // 中间点 1 (起点水平延伸出的点)
  const cp1x = startX + offset
  const cp1y = startY

  // 中间点 2 (终点水平延伸进来的点)
  const cp2x = endX - offset
  const cp2y = endY

  // 3. 生成 SVG Path 指令
  // M: 移动到起点
  // L: 画直线到 cp1
  // L: 画直线到 cp2
  // L: 画直线到终点
  // 注意：为了更平滑，中间转角处可以用 'C' (贝塞尔曲线) 代替 'L'，这里演示纯折线
  return `M ${startX} ${startY} L ${cp1x} ${cp1y} L ${cp2x} ${cp2y} L ${endX} ${endY}`
  //return `M ${startX} ${startY} C ${cp1x} ${cp1y} , ${cp2x} ${cp2y} , ${endX} ${endY}`
})
</script>

<style scoped>
.canvas {
  position: relative;
  width: 100%;
  height: 500px;
}

.svg-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.node {
  position: absolute;
  width: 120px;
  height: 60px;
  background: white;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.start {
  left: 100px;
  top: 100px;
}

.end {
  left: 400px;
  top: 200px;
}
</style>
