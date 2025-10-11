<template>
  <h2>模态框</h2>
  <div>
    <h3>基础</h3>
    <fl-button @click="visible1 = true">
      打开
    </fl-button>
    <fl-modal v-model="visible1" title="这是标题">
      <template #content>
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
      </template>
    </fl-modal>
  </div>
  <div>
    <h3>点击遮罩层不关闭</h3>
    <fl-button @click="visible2 = true">
      打开
    </fl-button>
    <fl-modal title="这是标题" :maskClose="false" v-model="visible2">
      <template #content>
        这是内容
      </template>
    </fl-modal>
  </div>
  <div>
    <h3>自定义footer</h3>
    <fl-button @click="visible3 = true">
      打开
    </fl-button>
    <fl-modal title="这是标题" v-model="visible3">
      <template #content>
        这是内容
      </template>
      <template #footer>
        这是自定义尾部
      </template>
    </fl-modal>
  </div>
  <div>
    <h3>自定义 取消、确认按钮文本</h3>
    <fl-button @click="visible4 = true">
      打开
    </fl-button>
    <fl-modal title="这是标题" confirmButtonText="自定义确认按钮文本" cancelButtonText="自定义取消按钮文本" v-model="visible4">
      <template #content>
        这是内容
      </template>
    </fl-modal>
  </div>
  <div>
    <h3>无取消</h3>
    <fl-button @click="visible5 = true">
      打开
    </fl-button>
    <fl-modal :showCancelButton="false" title="这是标题" v-model="visible5">
      <template #content>
        这是内容
      </template>
    </fl-modal>
  </div>
  <div>
    <h3>无确认</h3>
    <fl-button @click="visible6 = true">
      打开
    </fl-button>
    <fl-modal :showConfirmButton="false" title="这是标题" v-model="visible6">
      <template #content>
        这是内容
      </template>
    </fl-modal>
  </div>
  <div>
    <h3>取消和确认事件</h3>
    <fl-button @click="visible7 = true">
      打开
    </fl-button>
    <fl-modal @cancel="cancelEvent1" @ok="okEvent1" title="这是标题" v-model="visible7">
      <template #content>
        这是内容
      </template>
    </fl-modal>
  </div>
  <div>
    <h3>异步确认</h3>
    <fl-button @click="visible8 = true">
      打开
    </fl-button>
    <fl-modal :beforeChange="beforeChange1" title="这是标题" v-model="visible8">
      <template #content>
        这是内容
      </template>
    </fl-modal>
  </div>
  <div>
    <h3>关闭时内容不卸载</h3>
    <fl-button @click="visible9 = true">
      打开
    </fl-button>
    <fl-modal :unmountContentOnClose="false" v-model="visible9" title="这是标题">
      <template #content>
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
      </template>
    </fl-modal>
  </div>
  <div>
    <h3>自定义宽度</h3>
    <fl-button @click="visible10 = true">
      打开
    </fl-button>
    <fl-modal v-model="visible10" width="800" title="这是标题">
      <template #content>
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
      </template>
    </fl-modal>
  </div>
  <div>
    <h3>屏幕固定</h3>
    <fl-button @click="visible11 = true">
      打开
    </fl-button>
    <fl-modal v-model="visible11" fixedScreen title="这是标题">
      <template #content>
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
      </template>
    </fl-modal>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const visible5 = ref(false)
const visible6 = ref(false)
const visible7 = ref(false)
const visible8 = ref(false)
const visible9 = ref(false)
const visible10 = ref(false)
const visible11 = ref(false)
const cancelEvent1 = () => {
  console.log('取消事件')
}
const okEvent1 = () => {
  console.log('确认事件')
}
const beforeChange1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
</script>
