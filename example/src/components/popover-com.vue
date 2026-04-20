<template>
  <h3>Popover</h3>
  <div style="margin-left:200px">
    <fl-popover title="这是标题top">
      <template #reference>
        <button>top</button>
      </template>
      {{ av }}
    </fl-popover>
    <fl-popover title="这是标题top-start" placement="top-start">
      <template #reference>
        <button>top-start</button>
      </template>
      top-start
    </fl-popover>
    <fl-popover title="这是标题top-end" placement="top-end">
      <template #reference>
        <button>top-end</button>
      </template>
      top-end
    </fl-popover>
  </div>

  <div style="margin-left:250px">
    <fl-popover title="这是标题bottom" placement="bottom">
      <template #reference>
        <button>bottom</button>
      </template>
      bottom
    </fl-popover>
    <fl-popover title="这是标题bottom-start" placement="bottom-start">
      <template #reference>
        <button>bottom-start</button>
      </template>
      bottom-start
    </fl-popover>
    <fl-popover title="这是标题left-end" placement="bottom-end">
      <template #reference>
        <button>bottom-end</button>
      </template>
      bottom-end
    </fl-popover>
  </div>

  <div style="margin-left:300px">
    <fl-popover title="这是标题left" placement="left">
      <template #reference>
        <button>left</button>
      </template>
      left
    </fl-popover>
    <fl-popover title="这是标题left-start" placement="left-start">
      <template #reference>
        <button>left-start</button>
      </template>
      left-start
    </fl-popover>
    <fl-popover title="这是标题left-end" placement="left-end">
      <template #reference>
        <button>left-end</button>
      </template>
      left-end
    </fl-popover>
  </div>

  <div style="margin-left:350px">
    <fl-popover tag="button" title="这是标题right" placement="right">
      <template #reference>
        right
      </template>
      right
    </fl-popover>
    <fl-popover tag="button" title="这是标题right-start" placement="right-start">
      <template #reference>
        right-start
      </template>
      right-start
    </fl-popover>
    <fl-popover tag="button" title="这是标题right-end" placement="right-end">
      <template #reference>
        right-end
      </template>
      right-end
    </fl-popover>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const av = ref('')

setTimeout(() => {
  av.value = '这是更新后的值fjdslfjslfjslfjsdljfdsf'
}, 4000)
</script>
