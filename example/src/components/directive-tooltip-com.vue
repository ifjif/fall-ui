<template>
  <h3>directive-tooltip</h3>
  <div style="margin-left:300px">
    <button v-fl-tooltip="aa">
      展示浮层
    </button>
  </div>
  <div style="margin-left:200px">
    <button v-fl-tooltip="{ placement: 'top', content: 'top' }">
      top
    </button>
    <button v-fl-tooltip="{ placement: 'top-start', content: 'top-start' }">
      top-start
    </button>
    <button v-fl-tooltip="{ placement: 'top-end', content: 'top-end' }">
      top-end
    </button>
    <button style="width:200px" v-fl-tooltip="{ placement: 'top-start', content: 'top-start' }">
      top-start
    </button>
    <button style="width:200px" v-fl-tooltip="{ placement: 'top-end', content: 'top-end' }">
      top-end
    </button>
  </div>
  <div style="margin-left:200px">
    <button v-fl-tooltip="{ placement: 'bottom', content: 'bottom' }">
      bottom
    </button>
    <button v-fl-tooltip="{ placement: 'bottom-start', content: 'bottom-start' }">
      bottom-start
    </button>
    <button v-fl-tooltip="{ placement: 'bottom-end', content: 'bottom-end' }">
      bottom-end
    </button>
    <button style="width:200px" v-fl-tooltip="{ placement: 'bottom-start', content: 'bottom-start' }">
      bottom-start
    </button>
    <button style="width:200px" v-fl-tooltip="{ placement: 'bottom-end', content: 'bottom-end' }">
      bottom-end
    </button>
  </div>
  <div style="margin-left:200px">
    <button style="height:50px" v-fl-tooltip="{ placement: 'left', content: 'left' }">
      left
    </button>
    <button style="height:50px" v-fl-tooltip="{ placement: 'left-start', content: 'left-start' }">
      left-start
    </button>
    <button style="height:50px" v-fl-tooltip="{ placement: 'left-end', content: 'left-end' }">
      left-end
    </button>
    <button style="height:200px" v-fl-tooltip="{ placement: 'left-start', content: 'left-start' }">
      left-start
    </button>
    <button style="height:200px" v-fl-tooltip="{ placement: 'left-end', content: 'left-end' }">
      left-end
    </button>
  </div>
  <div style="margin-left:200px">
    <button style="height:50px" v-fl-tooltip="{ placement: 'right', content: 'right' }">
      right
    </button>
    <button style="height:50px" v-fl-tooltip="{ placement: 'right-start', content: 'right-start' }">
      right-start
    </button>
    <button style="height:50px" v-fl-tooltip="{ placement: 'right-end', content: 'right-end' }">
      right-end
    </button>
    <button style="height:200px" v-fl-tooltip="{ placement: 'right-start', content: 'right-start' }">
      right-start
    </button>
    <button style="height:200px" v-fl-tooltip="{ placement: 'right-end', content: 'right-end' }">
      right-end
    </button>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const aa = reactive({
  title: '这是title', placement: 'left', trigger: 'click', content: '这是内容'
})

setTimeout(() => {
  //aa.value = { ...aa.value, placement: 'top' }
  aa.placement = 'top'
}, 2000)

setTimeout(() => {
  //aa.value = { ...aa.value, trigger: 'hover' }
  aa.trigger = 'hover'
}, 4000)

setTimeout(() => {
  //aa.value = { ...aa.value, trigger: 'click' }
  aa.trigger = 'click'
}, 6000)
</script>
