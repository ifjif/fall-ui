<template>
  <ComponentLayout :anchors="anchors">
    <h2>menu</h2>
    <h3 id="fl-menu-basic">基础</h3>
    <div style="height: 500px;display: flex;flex-direction: column;margin-bottom: 50px;">
      <fl-container class="gray">
        <fl-header style="overflow:visible;" class="skyblue">
          <fl-menu :active-index="currentPath" @select="handleSelect" :data="menuData" :accordion="true"
            mode="horizontal"></fl-menu>
        </fl-header>
        <fl-container class="gray">
          <fl-aside style="overflow:visible;display:flex;flex-direction:column;background-color:#fff;">
            <button style="width:64px;font-size:12px;" @click="toggleCollapse">
              {{ isCollapse ? '展开' : '折叠' }}
            </button>
            <fl-scrollbar>
              <div style="flex:1;">
                <fl-menu :active-index="currentPath" @select="handleSelect" :accordion="false" :data="menuData"
                  :is-collapse="isCollapse">
                  <template #icon="{ item }">
                    <span
                      :style="{ display: 'inline-block', width: '24px', height: '24px', border: '1px solid red', borderRadius: '50%' }">
                      {{ item.icon }}
                    </span>
                  </template>

                  <template #title="{ item }">
                    <div>{{ item.title }}</div>
                    <span :style="{ fontSize: '12px' }">这是titlexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                  </template>
                </fl-menu>
              </div>
            </fl-scrollbar>
          </fl-aside>
          <fl-container class="gray">
            <fl-container class="gray">
              <fl-main class="beige">
                <router-view></router-view>
              </fl-main>
              <fl-aside style="background-color:#fff;overflow:hidden;">
                <button style="width:64px;font-size:12px;" @click="toggleCollapse">
                  {{ isCollapse ? '展开' : '折叠' }}
                </button>
                <fl-scrollbar>
                  <div>
                    <fl-menu :active-index="currentPath" @select="handleSelect" :accordion="true" :data="menuData"
                      :is-collapse="isCollapse"></fl-menu>
                  </div>
                </fl-scrollbar>
              </fl-aside>
            </fl-container>
            <fl-footer height="60" class="skyblue">
              footer
            </fl-footer>
          </fl-container>
        </fl-container>
      </fl-container>
    </div>
    <h3 id="fl-menu-self">自定义</h3>

    <button style="width:64px;font-size:12px;" @click="toggleCollapse">
      {{ isCollapse ? '展开' : '折叠' }}
    </button>
    <fl-menu :width="300" :styles="styles" :active-index="currentPath" @select="handleSelect" :is-collapse="isCollapse"
      :data="menuData" :accordion="true"></fl-menu>

    <h3 id="fl-menu-attrs">属性</h3>
    <fl-table :data="data" :columns="columns">
      <template #value="{ row }">
        <pre>{{ row.value }}</pre>
      </template>
    </fl-table>
    <h3 id="fl-menu-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
    <h3 id="fl-menu-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
  </ComponentLayout>

</template>
<script setup>
import { ref, watch } from 'vue'
import { menuData } from '@/assets/menuData'
import { useRouter, useRoute } from 'vue-router'
import { columns, slotColumns, eventColumns } from '@/assets/com-props'
import ComponentLayout from '@/layout/component-layout.vue'

const router = useRouter()
const route = useRoute()

const currentPath = ref('')
const isCollapse = ref(false)
const handleSelect = (index) => {
  currentPath.value = index
  router.push(index)
}

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

watch(() => route.path, (path) => {
  currentPath.value = path
}, { immediate: true })

const anchors = [
  { title: '基础', href: '#fl-menu-basic' },
  { title: '自定义', href: '#fl-menu-self' },
  { title: '属性', href: '#fl-menu-attrs' },
  { title: '插槽', href: '#fl-menu-slots' },
  { title: '事件', href: '#fl-menu-events' },
]

const styles = {
  root: {
    bg_color: '#000',
    color: '#f3f4f5',
    sub_bg_color: 'gray'
  },
  hover: {
    color: 'green',
    bg_color: 'beige'
  },
  active: {
    color: 'purple',
    bg_color: 'pink',
    bar_color: 'red'
  }
}

const styles_ = {
  root: {
    bg_color: '',
    sub_bg_color: '',
    color: '',
  },
  hover: {
    bg_color: '',
    color: '',
  },
  active: {
    bg_color: '',
    color: '',
    bar_color: '',
  }
}

const data_ = {
  title: '',
  index: '',
  icon: '',
  children: [{ title: '', index: '', icon: '', children: [] }]
}

const data = [
  { name: 'data', type: 'Array', default: '', value: JSON.stringify(data_, null, 2), desc: '' },
  { name: 'activeIndex', type: 'String', default: '', value: '', desc: '' },
  { name: 'isCollapse', type: 'Boolean', default: 'false', value: 'true, false', desc: '控制折叠' },
  { name: 'accordion', type: 'Boolean', default: 'false', value: 'true, false', desc: '手风琴模式' },
  { name: 'mode', type: 'String', default: 'vertical', value: 'vertical, horizontal', desc: '' },
  { name: 'width', type: 'Number, String', default: '240', value: '', desc: '宽度' },
  { name: 'collapseWidth', type: 'Number, String', default: '48', value: '', desc: '折叠宽度' },
  { name: 'styles', type: 'Object', default: '', value: JSON.stringify(styles_, null, 2), desc: '自定义颜色' },
]

const slotData = [
  { name: 'icon', param: 'item', desc: 'icon插槽，没有icon默认为data的icon，有item就是data' },
  { name: 'title', param: 'item', desc: 'title插槽，没有title默认为data的title, 有item就是data' },
]

const eventData = [
  { name: 'select', params: '(index)', desc: '触发选中事件' }
]

</script>

<style scoped>
.gray {
  background-color: gray;
}

.skyblue {
  background-color: skyblue;
}

.yellow {
  background-color: yellow;
}

.beige {
  background-color: beige;
}
</style>
