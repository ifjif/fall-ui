<template>
  <h3>menu</h3>
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
                :is-collapse="isCollapse"></fl-menu>
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

</template>
<script setup>
import { ref, watch } from 'vue'
import { menuData } from '@/assets/menuData'
import { useRouter, useRoute } from 'vue-router'

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
