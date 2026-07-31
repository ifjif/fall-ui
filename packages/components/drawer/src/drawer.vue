<template>
  <Mask @close="close" :maskClose="maskClose" :style="[zIndexStyle]">
    <div :class="[ns.b()]">
      <div @click.stop :class="[ns.e('wrapper'), ns.m('placement', placement),
      ns.is('fixedScreen', fixedScreen)]" :style="[widthStyle, heightStyle]">
        <div :class="[ns.e('header')]">{{ title }}</div>
        <div :class="[ns.e('content')]">
          <div :class="[ns.e('render-content'), ns.is('fixedScreen', fixedScreen)]">
            <template v-if="isStringContent"> {{ content }}</template>
            <template v-if="isVNodeContent">
              <component :is="content"></component>
            </template>
          </div>
        </div>
        <div :class="[ns.e('footer')]">
          <Button @click="cancelEvent" text size="large">取消</Button>
          <Button @click="confirmEvent" :beforeChange="beforeChange" type="primary" size="large">确认</Button>
        </div>
      </div>
    </div>
  </Mask>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('drawer')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { useDrawer } from './composables/use-drawer'
import { onMounted } from 'vue'
const ns = useNamespace('drawer')

const props = defineProps({
  onClose: Function,
  placement: {
    type: String,
    default: () => 'right',
    validator(v) {
      return ['left', 'right', 'top', 'bottom'].includes(v)
    }
  },
  fixedScreen: Boolean,
  height: [String, Number],
  width: [String, Number],
  beforeChange: Function,
  maskClose: {
    type: Boolean,
    default: true
  },
  content: [String, Object],
  title: String
})

const emit = defineEmits(['cancel', 'ok'])

const {
  Button,
  Mask,
  widthStyle,
  heightStyle,
  isStringContent,
  isVNodeContent,
  zIndexStyle,
  nextZIndex,
  close,
  cancelEvent,
  confirmEvent
} = useDrawer(props, emit)

onMounted(() => {
  nextZIndex()
})
</script>
