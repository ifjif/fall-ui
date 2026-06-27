<template>
  <div class="my-anchor" :style="[anchorStyle]">
    <!-- 活跃线-->
    <div class="active-bar" :style="activeBarStyle"></div>
    <ul style="padding-left:10px;" ref="anchorListRef">
      <AnchorItem @click="handleClick" v-for="anchor in data" :key="anchor.href" :anchor="anchor" />
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
import { useNamespace } from '@fall-ui/hooks';
import { computed, provide, ref, nextTick, watch, onUnmounted } from 'vue'
import AnchorItem from './anchor-item.vue'
const ns = useNamespace('anchor')


const props = defineProps({
  data: { // [{title, href:'#xxx', children}]
    type: Array,
    required: true,
    default: () => []
  },
  container: { // 滚动容器，默认为 window，可以传选择器#xxx, 也可以是dom对象
    type: [String, Object],
    default: () => 'window'
  },
  offsetTop: { // 距离顶部的偏移量，用于固定定位或滚动补偿
    type: Number,
    default: 0
  },
  affix: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'change'])

// 将数据进行 扁平化
const flattenTree = (data) => {
  let result = []

  data.forEach(item => {
    result.push(item)
    if (item.children && item.children.length > 0) {
      result.push(...flattenTree(item.children))
    }
  })

  return result
}
const flatData = computed(() => flattenTree(props.data))

const anchorListRef = ref(null)
const activeHref = ref('')

provide('anchor_root', {
  activeHref
})

const activeBarStyle = ref({
  top: '0',
  height: '0',
})

const getScrollContainer = (container) => {
  // window
  if (container === 'window') return window

  // 选择器，进行查找
  if (typeof container === 'string') return document.querySelector(container)

  // dom对象， 直接返回
  return container
}

// {title, href:'#xxx'}
const getAnchorEl = (item) => {
  const id = item.href.replace('#', '')
  const targetEl = document.getElementById(id)

  return targetEl
}

const handleClick = (item) => {
  const targetEl = getAnchorEl(item)
  if (!targetEl) return

  targetEl.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })

  emit('click', item)
}

const updateActiveBar = () => {
  // dom更新后 去执行，这时刚好是变化后的节点
  nextTick(() => {
    const anchorList = anchorListRef.value
    if (!anchorList) return

    const activeEl = anchorList.querySelector('.active-href')

    if (!activeEl) return

    activeBarStyle.value = {
      top: activeEl.offsetTop + 'px',
      height: activeEl.offsetHeight + 'px'
    }
  })
}

const scrollEvent = (e) => {
  const scrollTop = getScrollTop(props.container)

  // 遍历所有的 锚点，找到离滚动位置最近的 锚点
  const anchors = flatData.value
  let maxTop = -Infinity
  let currentActive = ''

  anchors.some(anchor => {
    const targetEl = getAnchorEl(anchor)
    if (!targetEl) return false

    // 获取 相对于容器顶部的 offsetTop
    const offsetTop = targetEl.offsetTop

    // 增加 10px 让判定更敏感
    if ((scrollTop + 10) >= offsetTop) {
      if (offsetTop > maxTop) {
        maxTop = offsetTop
        currentActive = anchor.href
        return false
      }
    }

    return true
  })

  // 不存在，默认第一个
  if (!currentActive && anchors.length > 0) {
    currentActive = anchors[0].href
  }

  if (currentActive !== activeHref.value) {
    activeHref.value = currentActive
    emit('change', currentActive)
    updateActiveBar()
  }
}

const getScrollTop = (container) => {
  const el = getScrollContainer(container)
  if (el === window) return el.pageYOffset || el.document.documentElement.scrollTop

  return el.scrollTop
}

const addScrollEvent = (container) => {
  const el = getScrollContainer(container)
  if (!el) return
  el.addEventListener('scroll', scrollEvent)
}
const removeScrollEvent = (container) => {
  const el = getScrollContainer(container)
  if (!el) return
  el.removeEventListener('scroll', scrollEvent)
}

watch(() => props.container, (nv, ov) => {
  if (ov) removeScrollEvent(ov)
  if (nv) addScrollEvent(nv)

  // 触发一次 active
  scrollEvent()
})

const anchorStyle = ref({})

// 监听吸附
watch(() => props.affix, nv => {
  if (nv) {
    anchorStyle.value = {
      position: 'fixed',
      top: `${props.offsetTop}px`,
      width: '200px'
    }
  } else {
    anchorStyle.value = {}
  }
}, { immediate: true })

onUnmounted(() => {
  removeScrollEvent(props.container)
})

</script>
<style scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.my-anchor {
  position: relative;
}

.active-bar {
  position: absolute;
  width: 2px;
  background-color: #409eff;
  left: 0;
  transition: top 0.3s ease-in-out, height 0.3s ease-in-out;
}
</style>
