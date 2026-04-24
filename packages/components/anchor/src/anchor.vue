<template>
  <div class="my-anchor" :style="anchorStyle">
    <div class="my-anchor__ink" :style="inkStyle"></div>
    <ul class="my-anchor__list">
      <li v-for="(item, index) in anchorList" :key="item.href" class="my-anchor__item">
        <a :href="item.href" class="my-anchor__link" :class="{ 'is-active': activeHref === item.href }"
          @click.prevent="handleClick(item, index)">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('anchor')

export default {
  name: ns.b()
}
</script>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

// 1. 定义 Props
const props = defineProps({
  // 锚点列表数据 [{ title: '标题', href: '#id' }]
  anchorList: {
    type: Array,
    required: true,
    default: () => []
  },
  // 滚动容器，默认为 window，也可以传选择器如 '#container'
  container: {
    type: [String, Object],
    default: 'window'
  },
  // 距离顶部的偏移量（用于固定定位或滚动补偿）
  offsetTop: {
    type: Number,
    default: 0
  },
  // 是否吸顶
  affix: {
    type: Boolean,
    default: false
  }
});

// 2. 定义 Emits
const emit = defineEmits(['click', 'change']);

// 3. 响应式状态
const activeHref = ref('');
const inkStyle = ref({ top: '0px', height: '0px' });
const anchorStyle = ref({});

// 获取滚动容器元素
const getContainer = () => {
  if (props.container === 'window') return window;
  const a = typeof props.container === 'string'
    ? document.querySelector(props.container)
    : props.container;
  return a
};

// 4. 核心方法：点击跳转
const handleClick = (item, index) => {
  const targetId = item.href.replace('#', '');
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    // 更新高亮
    activeHref.value = item.href;

    // 平滑滚动
    // 注意：scrollIntoView 的 block 选项会影响对齐方式
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    emit('click', item);
  }
};

// 5. 核心方法：滚动监听与高亮计算
const handleScroll = () => {
  const container = getContainer();
  // 获取当前的滚动高度
  const scrollTop = container === window
    ? window.pageYOffset || document.documentElement.scrollTop
    : container.scrollTop;

  // 找到当前滚动位置对应的锚点
  // 逻辑：遍历所有锚点元素，找到距离视口顶部最近且未被卷过的那个
  const links = props.anchorList;
  let currentActive = '';
  let maxTop = -Infinity;

  links.forEach(item => {
    const targetId = item.href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      // 计算元素相对于文档顶部的距离
      const elementTop = element.offsetTop;
      // 加上一个缓冲值（比如 offsetTop），让判定更灵敏
      if (scrollTop >= elementTop - props.offsetTop) {
        if (elementTop > maxTop) {
          maxTop = elementTop;
          currentActive = item.href;
        }
      }
    }
  });

  // 如果找不到（可能在最顶部），默认选第一个
  if (!currentActive && links.length > 0) {
    currentActive = links[0].href;
  }

  // 更新状态
  if (currentActive !== activeHref.value) {
    activeHref.value = currentActive;
    emit('change', currentActive);
  }

  updateInkPosition();
};

// 更新左侧滑块的视觉位置
const updateInkPosition = () => {
  if (!activeHref.value) return;

  nextTick(() => {
    const activeLink = document.querySelector(`.my-anchor__link.is-active`);
    if (activeLink) {
      const parent = activeLink.parentElement;
      inkStyle.value = {
        top: `${parent.offsetTop}px`,
        height: `${parent.offsetHeight}px`
      };
    }
  });
};

let setE = false

// 6. 生命周期处理
onMounted(() => {
  nextTick(() => {
    const container = getContainer();
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // 初始化一次位置
      updateInkPosition();
      setE = true
    }
  })
});

watch(() => props.container, () => {
  if (setE) return
  const container = getContainer();
  if (container) {
    container.addEventListener('scroll', handleScroll);
    // 初始化一次位置
    updateInkPosition();
    setE = true
  }
})

onUnmounted(() => {
  const container = getContainer();
  container.removeEventListener('scroll', handleScroll);
});

// 监听吸顶属性变化
watch(() => props.affix, (val) => {
  if (val) {
    anchorStyle.value = {
      position: 'fixed',
      top: `${props.offsetTop}px`,
      width: '200px' // 示例宽度
    };
  } else {
    anchorStyle.value = {};
  }
}, { immediate: true });

</script>

<style scoped>
.my-anchor {
  position: relative;
  padding-left: 20px;
  width: 200px;
}

.my-anchor__ink {
  position: absolute;
  left: 0;
  width: 2px;
  background-color: #409eff;
  /* Element Plus 蓝色 */
  transition: top 0.3s ease-in-out, height 0.3s ease-in-out;
  border-radius: 2px;
}

.my-anchor__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.my-anchor__item {
  margin-bottom: 4px;
  position: relative;
}

.my-anchor__link {
  display: block;
  font-size: 14px;
  color: #606266;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.my-anchor__link:hover {
  color: #409eff;
  background-color: #f5f7fa;
}

.my-anchor__link.is-active {
  color: #409eff;
  font-weight: 500;
}
</style>
