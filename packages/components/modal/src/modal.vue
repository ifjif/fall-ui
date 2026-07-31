<template>
  <Teleport to="body">
    <Mask v-show="visible" :maskClose="maskClose" @close="visible = false" :style="[zIndexStyle]">
      <div :class="[ns.b()]">
        <div @click.stop :class="[ns.e('wrapper'), ns.is('fixedScreen', fixedScreen)]" :style="[widthStyle]">
          <div :class="[ns.e('header')]">
            <h4 :class="[ns.e('title')]">
              {{ title }}
            </h4>
            <span @click="visible = false" :class="[ns.e('close')]">&times;</span>
          </div>
          <div :class="[ns.e('content')]">
            <div v-if="visible || !unmountContentOnClose"
              :class="[ns.e('render-content'), ns.is('fixedScreen', fixedScreen)]">
              <slot name="content" />
            </div>
          </div>
          <div :class="[ns.e('footer')]">
            <slot name="footer" />
            <template v-if="!$slots.footer">
              <Button v-if="showCancelButton" @click="cancelEvent" text size="large">{{ cancelButtonText }}</Button>
              <Button :beforeChange="beforeChange" v-if="showConfirmButton" @click="confirmEvent" type="primary"
                size="large">{{ confirmButtonText
                }}</Button>
            </template>
          </div>
        </div>
      </div>
    </Mask>
  </Teleport>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('modal')

export default {
  name: ns.b()
}
</script>
<script setup>
import { FlMask as Mask, FlButton as Button } from '@fall-ui/components'
import { useNamespace } from '@fall-ui/hooks';
import { useModal } from './composables/use-modal'
import { onMounted } from 'vue'
const ns = useNamespace('modal')

const visible = defineModel({ type: Boolean })

const props = defineProps({
  maskClose: {
    type: Boolean,
    default: () => true
  },
  title: String,
  confirmButtonText: {
    type: String,
    default: () => '确认'
  },
  cancelButtonText: {
    type: String,
    default: () => '取消'
  },
  showCancelButton: {
    type: Boolean,
    default: () => true
  },
  unmountContentOnClose: {
    type: Boolean,
    default: () => true
  },
  showConfirmButton: {
    type: Boolean,
    default: () => true
  },
  beforeChange: Function,
  width: {
    type: [Number, String],
    default: () => ''
  },
  fixedScreen: Boolean
})
const emit = defineEmits(['ok', 'cancel'])

const { widthStyle, zIndexStyle, nextZIndex, cancelEvent, confirmEvent } = useModal(props, emit, visible)

onMounted(() => {
  nextZIndex()
})
</script>
