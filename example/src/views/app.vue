<template>
  <fl-container style="width:100vw;height:100vh;">
    <fl-header>
      <div
        style="display:flex;justify-content: space-between;align-items:center;background-color: skyblue;height:64px;">
        <h2 style="margin:0;">🍁Fall-UI🍁</h2>
        <fl-popover trigger="hover" class="avatar1" placement="bottom-end" :show-arrow="false">
          <template #reference>
            <img style="width:50px;height:50px;border-radius: 50%;" src="../assets/avatar1.png" />
          </template>
          <div>
            <p>
              <strong>github:</strong>
              <a target="_blank" href="https://github.com/ifjif/fall-ui">https://github.com/ifjif/fall-ui</a>
            </p>
            <p>
              <strong>gitee:</strong>
              <a target="_blank" href="https://gitee.com/zcfong">https://gitee.com/zcfong</a>
            </p>
            <p>
              <strong>邮箱:</strong>
              <span>ch.en.g@qq.com</span>
            </p>
          </div>
        </fl-popover>
      </div>
    </fl-header>
    <fl-container>
      <fl-aside style="background-color:beige;display:flex;flex-direction: column;overflow: hidden;">
        <fl-scrollbar>
          <fl-menu @select="handlSelet" :active-index="activeIndex" :accordion="false" :is-collapse="isCollapse"
            :data="comData"></fl-menu>
        </fl-scrollbar>
      </fl-aside>
      <fl-container>
        <fl-header>
          <div style="display:flex;gap:10px;align-items:center;background-color: palegreen;height:34px;">
            <fl-button type="primary" size="small" @click="isCollapse = !isCollapse">
              {{ isCollapse ? '展开' : '折叠' }}
            </fl-button>
            <fl-breadcrumb separator=">">
              <fl-breadcrumb-item to="/">首页</fl-breadcrumb-item>
              <template v-for="item in crumbs" :key="item.path">
                <fl-breadcrumb-item :to="item.path">{{ item.name
                  }}</fl-breadcrumb-item>
              </template>
            </fl-breadcrumb>
          </div>
        </fl-header>
        <fl-header>
          <div style="background-color: #fff;">
            <fl-tabs :only-header="true" type="card" v-model="activeTab" @tab-remove="handleTabRemove">
              <template v-for="tab in tabs" :key="tab.path">
                <fl-tab-pane :label="tab.name" :name="tab.path" closable></fl-tab-pane>
              </template>
            </fl-tabs>
          </div>
        </fl-header>
        <fl-main>
          <routerView />
        </fl-main>
      </fl-container>
    </fl-container>
  </fl-container>
</template>
<script setup>
import comData from '@/assets/com-data';
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
// route.matched 包含当前 以及 当前的所有父级

const activeTab = ref('')
const route = useRoute()
const router = useRouter()
const tabs = ref([])
const crumbs = ref([])

const activeIndex = ref('/')
const isCollapse = ref(false)

const handlSelet = (index) => {
  router.push(index)
}

const getCrumbs = () => {
  const matched = route.matched.filter(r => r.meta.title)
  return matched.map(r => ({ path: r.path, name: r.meta.title }))
}

const addTab = (name, path) => {
  if (!name) return
  const index = tabs.value.findIndex(tab => tab.path === path)
  if (index === -1) {
    tabs.value.push({ name, path })
  }
  activeTab.value = path
}

const handleTabRemove = (name) => {
  const index = tabs.value.findIndex(tab => tab.path === name)
  if (index === -1) return
  tabs.value.splice(index, 1)
}

watch(() => activeTab.value, (nv) => {
  if (nv === route.path) return
  router.push(nv)
})

watch(() => route.path, (path) => {
  activeIndex.value = path
  crumbs.value = getCrumbs()
  addTab(route.name, path)
}, { immediate: true })
</script>

<style scoped>
.avatar1 {
  margin-right: 20px;
}
</style>
