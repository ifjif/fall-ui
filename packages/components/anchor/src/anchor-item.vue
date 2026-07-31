<template>
  <li :class="[ns.b()]" :key="anchor.href">
    <span :style="[paddingLeft]" :href="anchor.href" :class="[ns.e('title'), ns.is('active-href', isActive)]"
      @click.prevent="$emit('click', anchor)">
      {{ anchor.title }}
    </span>

    <ul v-if="hasChildren">
      <AnchorItem @click="$emit('click', item)" :indent="indent + 1" v-for="item in anchor.children" :key="item.href"
        :anchor="item"></AnchorItem>
    </ul>
  </li>
</template>
<script setup>
import AnchorItem from './anchor-item.vue'
import { computed, inject } from 'vue'
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('anchor-item')

const props = defineProps({
  anchor: { //{title, href:'#xx', children}
    type: Object,
    required: true
  },
  indent: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['click'])

const anchorRoot = inject('anchor_root')

const isActive = computed(() => anchorRoot.activeHref.value === props.anchor.href)

const hasChildren = computed(() => props.anchor.children && props.anchor.children.length > 0)
const paddingLeft = computed(() => ({
  paddingLeft: `${props.indent * 20}px`
}))

</script>
