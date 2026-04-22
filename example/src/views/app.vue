<template>
  <fl-container style="width:100vw;height:100vh;">
    <fl-header>
      <div style="display:flex;align-items:center;background-color: skyblue;height:64px;">
        <h2 style="margin:0;">🍁Fall-UI🍁</h2>
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
          <div style="display:flex;align-items:center;background-color: palegreen;height:34px;">
            <fl-button type="primary" size="small" @click="isCollapse = !isCollapse">
              {{ isCollapse ? '展开' : '折叠' }}
            </fl-button>
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

const route = useRoute()
const router = useRouter()

const activeIndex = ref('/home')
const isCollapse = ref(false)

const handlSelet = (index) => {
  router.push(index)
}

watch(() => route.path, (path) => {
  activeIndex.value = path
}, { immediate: true })
</script>
