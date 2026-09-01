<template>
  <ComponentLayout :anchors="anchors">
    <h2>模态框</h2>
    <div>
      <h3 id="fl-modal-basic">基础</h3>
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
      <h3 id="fl-modal-maskclose-false">点击遮罩层不关闭</h3>
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
      <h3 id="fl-modal-self-footer">自定义footer</h3>
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
      <h3 id="fl-modal-self-confirm-concel-text">自定义 取消、确认按钮文本</h3>
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
      <h3 id="fl-modal-no-concel">无取消</h3>
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
      <h3 id="fl-modal-no-confirm">无确认</h3>
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
      <h3 id="fl-modal-concel-confirm-event">取消和确认事件</h3>
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
      <h3 id="fl-modal-confirm-async">异步确认</h3>
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
      <h3 id="fl-modal-close-content-exist">关闭时内容不卸载</h3>
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
      <h3 id="fl-modal-close-width-self">自定义宽度</h3>
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
      <h3 id="fl-modal-fixed-screen">屏幕固定</h3>
      <fl-button @click="visible11 = true">
        打开
      </fl-button>
      <fl-modal v-model="visible11" fixedScreen title="这是标题">
        <template #content>
          <fl-scrollbar @resize="handleResize">
            <div :style="{ width: `${fixedWidth}px` }">
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
            </div>
          </fl-scrollbar>
        </template>
      </fl-modal>
    </div>

    <h3 id="fl-modal-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-modal-models">model</h3>
    <fl-table :data="modelData" :columns="columns"></fl-table>
    <h3 id="fl-modal-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
    <h3 id="fl-modal-event">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue'
import { columns, eventColumns, slotColumns } from '@/assets/com-props'
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

const fixedWidth = ref(500)
const handleResize = ({ clientWidth }) => {
  fixedWidth.value = clientWidth
}

const anchors = [
  { title: '基础', href: 'fl-modal-basic' },
  { title: '点击遮罩层不关闭', href: 'fl-modal-maskclose-false' },
  { title: '自定义footer', href: 'fl-modal-self-footer' },
  { title: '自定义取消，确认按钮文本', href: 'fl-modal-self-confirm-concel-text' },
  { title: '无取消', href: 'fl-modal-no-concel' },
  { title: '无确认', href: 'fl-modal-no-confirm' },
  { title: '取消和确认事件', href: 'fl-modal-concel-confirm-event' },
  { title: '异步确认', href: 'fl-modal-confirm-async' },
  { title: '关闭时内容不销毁', href: 'fl-modal-close-content-exist' },
  { title: '自定义宽度', href: 'fl-modal-close-width-self' },
  { title: '屏幕固定', href: 'fl-modal-fixed-screen' },
  { title: '属性', href: 'fl-modal-attrs' },
  { title: 'model', href: 'fl-modal-models' },
  { title: '插槽', href: 'fl-modal-slots' },
  { title: '事件', href: 'fl-modal-event' }
]


const data = [
  { name: 'maskClose', type: 'Boolean', default: 'true', value: 'true,false', desc: '' },
  { name: 'title', type: 'String', default: '', value: '', desc: '' },
  { name: 'confirmButtonText', type: 'String', default: '确认', value: '', desc: '' },
  { name: 'cancelButtonText', type: 'String', default: '取消', value: '', desc: '' },
  { name: 'showCancelButton', type: 'Boolean', default: 'true', value: 'true,false', desc: '' },
  { name: 'unmountContentOnClose', type: 'Boolean', default: 'true', value: 'true,false', desc: '' },
  { name: 'showConfirmButton', type: 'Boolean', default: 'true', value: 'true,false', desc: '' },
  { name: 'beforeChange', type: 'Function', default: '', value: '', desc: '' },
  { name: 'width', type: 'Number, String', default: '', value: '', desc: '' },
  { name: 'fixedScreen', type: 'Boolean', default: 'false', value: 'true,false', desc: '' },
]

const modelData = [
  { name: '', type: 'Boolean', default: '', value: 'true,false', desc: 'modal框展示或隐藏' },
]

const slotData = [
  { name: 'content', param: '', desc: '' },
  { name: 'footer', param: '', desc: '不存在，默认显示按钮' },
]
const eventData = [
  { name: 'ok', params: '', desc: '点击确认时' },
  { name: 'cancel', params: '', desc: '点击取消时，默认关闭' }
]

</script>
