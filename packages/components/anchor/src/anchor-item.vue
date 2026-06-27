<template>
  <li class="anchor-item" :key="anchor.href">
    <span :style="[paddingLeft]" :href="anchor.href" :class="[{ 'active-href': isActive }]"
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
<style scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.anchor-item {
  cursor: pointer;
  color: #606266;

  span {
    transition: color 0.3s ease-in-out;
  }

  span:hover {
    color: #409eff;
  }

}

.active-href {
  color: #409eff;
}
</style>
