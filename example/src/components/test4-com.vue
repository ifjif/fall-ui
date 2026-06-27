<template>
  <div class="canvas">
    <svg class="svg-layer">
      <!-- 渲染连线 -->
      <path :d="computedPath" stroke="#546099" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
    </svg>

    <!-- 渲染节点（障碍物） -->
    <div v-for="node in nodes" :key="node.id" class="node" :style="{ left: node.x + 'px', top: node.y + 'px' }">
      {{ node.label }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const nodes = [
  { id: '1', label: '起点', x: 50, y: 100, w: 100, h: 60 },
  { id: '2', label: '障碍物', x: 200, y: 80, w: 100, h: 100 }, // 挡在中间
  { id: '3', label: '终点', x: 400, y: 100, w: 100, h: 60 }
]

const computedPath = computed(() => {
  const startNode = nodes[0]
  const endNode = nodes[2]
  const obstacles = nodes.filter(n => n.id !== '1' && n.id !== '3') // 排除起点终点

  // 1. 计算起点和终点坐标（端口位置）
  const start = { x: startNode.x + startNode.w, y: startNode.y + startNode.h / 2 }
  const end = { x: endNode.x, y: endNode.y + endNode.h / 2 }

  // 2. 调用算法获取路径点数组
  const points = getManhattanPath(start, end, obstacles)

  // 3. 转换为 SVG Path 字符串
  // 使用 L 命令连接所有点
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return d
})


// 判断两个矩形是否相交
function isRectIntersect(r1, r2) {
  return !(r2.x > r1.x + r1.w || r2.x + r2.w < r1.x || r2.y > r1.y + r1.h || r2.y + r1.y + r1.h < r1.y);
}

// 判断点是否在矩形内
function isPointInRect(p, r) {
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

// 核心算法：计算曼哈顿路径
function getManhattanPath(start, end, obstacles) {
  // start, end: {x, y}
  // obstacles: [{x, y, w, h}, ...]

  // 1. 定义起点和终点的方向（通常先水平走）
  const direction = 'horizontal'; // 或者 'vertical'

  // 2. 简单的单向曼哈顿算法（仅处理起点在左，终点在右的情况作为演示）
  // 实际工程中需要处理 4 个象限的方向

  const path = [];
  let current = { ...start };
  path.push(current);

  // 简单的三步走策略：水平 -> 垂直 -> 水平
  // 我们需要找到中间的两个拐点 P1 和 P2

  // 策略：在起点和终点之间找一个“安全”的垂直通道
  const midX = start.x + (end.x - start.x) / 2;

  // 候选的 Y 坐标（起点Y，终点Y，以及所有障碍物的上下边缘）
  const candidateYs = [start.y, end.y];
  obstacles.forEach(obs => {
    candidateYs.push(obs.y - 10); // 障碍物上方（留10px边距）
    candidateYs.push(obs.y + obs.h + 10); // 障碍物下方
  });

  // 寻找最佳的中转 Y 坐标
  // 目标：找到一个 Y，使得 (midX, Y) 这个点不在任何障碍物内，且连线尽量短
  let bestY = start.y;
  let minDist = Infinity;

  for (let y of candidateYs) {
    // 检查路径是否穿过障碍物
    // 路径分段：Start -> (midX, y) -> End
    // 我们需要检查这两段线是否与障碍物相交

    // 简化检查：只检查关键点 (midX, y) 是否在障碍物内
    // 更严谨的做法是检查线段相交
    const p1 = { x: midX, y: y };

    // 简单的避障逻辑：如果中间点撞了，就跳过
    let collision = false;
    for (let obs of obstacles) {
      // 扩大障碍物范围一点点，避免线贴着边走
      const paddedObs = { x: obs.x - 5, y: obs.y - 5, w: obs.w + 10, h: obs.h + 10 };
      if (isPointInRect(p1, paddedObs)) {
        collision = true;
        break;
      }
    }

    if (!collision) {
      const dist = Math.abs(y - start.y) + Math.abs(y - end.y);
      if (dist < minDist) {
        minDist = dist;
        bestY = y;
      }
    }
  }

  // 构建路径点
  // 1. 起点 -> 水平延伸到 midX
  path.push({ x: midX, y: start.y });
  // 2. 垂直移动到 bestY
  path.push({ x: midX, y: bestY });
  // 3. 水平移动到终点 X
  path.push({ x: end.x, y: bestY });
  // 4. 垂直移动到终点
  path.push({ x: end.x, y: end.y });

  return path;
}
</script>
<style scoped>
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
</style>
