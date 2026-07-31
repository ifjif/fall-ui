<template>
  <ComponentLayout :anchors="anchors">
    <h2>滚动栏</h2>
    <h3 id="fl-scrollbar-basic">基础</h3>
    <fl-scrollbar style="background-color: yellow;" @top="topEvent" @bottom="bottomEvent" @left="leftEvent"
      @right="rightEvent" height="400" width="400">
      {{ content }}
    </fl-scrollbar>
    <h3 id="fl-scrollbar-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-scrollbar-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
    <h3 id="fl-scrollbar-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
    <h3 id="fl-scrollbar-expose">暴露</h3>
    <fl-table :data="exposeData" :columns="exposeColumns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue'
import { columns, eventColumns, exposeColumns, slotColumns } from '@/assets/com-props'
import { ref } from 'vue'
const content = ref(`
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
`)
setTimeout(() => {
  content.value = `
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
    fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
`
}, 2000)
setTimeout(() => {
  content.value = `
在现代社会的快节奏生活中，人们常常忽略了内心的声音与自然的呼唤。城市高楼林立，车水马龙，喧嚣掩盖了清晨鸟鸣与夜晚虫唱。然而，正是这些被遗忘的细微声响，构成了生命最本真的韵律。
科技的发展无疑带来了便利，但也在无形中拉远了人与人之间的距离。我们习惯于通过屏幕交流，却渐渐失去了面对面交谈时眼神交汇的温度；我们依赖导航系统指路，却不再记得抬头看星星辨方向的古老智慧。这种“进步”是否真的让我们更幸福？或许答案因人而异，但值得每个人深思。
与此同时，自然界的节奏始终如一。春天花开，夏日蝉鸣，秋叶飘落，冬雪覆盖——四季轮回从不因人类的忙碌而改变。走进山林，呼吸一口清新的空气，感受微风拂过脸颊，心灵仿佛被洗涤一般澄澈。越来越多的人开始意识到，回归自然不是逃避现实，而是为了更好地面对生活。
此外，内心的平静同样重要。冥想、阅读、书写，甚至只是静静地泡一杯茶，都能成为连接自我与世界的桥梁。在这个信息爆炸的时代，学会“断舍离”不仅是对物质的取舍，更是对精神空间的整理。唯有留出空白，才能容纳新的灵感与力量。
总之，生活的意义不仅在于追逐目标，更在于享受过程。不妨偶尔放慢脚步，聆听内心的声音，感受自然的脉动。也许你会发现，真正的幸福，就藏在那些看似平凡却充满温度的日常细节里。正如一句古老的谚语所说：“走得再远，也不要忘记为何出发。”愿我们都能在纷繁世界中，守住内心的宁静与热爱。
在现代社会的快节奏生活中，人们常常忽略了内心的声音与自然的呼唤。城市高楼林立，车水马龙，喧嚣掩盖了清晨鸟鸣与夜晚虫唱。然而，正是这些被遗忘的细微声响，构成了生命最本真的韵律。
科技的发展无疑带来了便利，但也在无形中拉远了人与人之间的距离。我们习惯于通过屏幕交流，却渐渐失去了面对面交谈时眼神交汇的温度；我们依赖导航系统指路，却不再记得抬头看星星辨方向的古老智慧。这种“进步”是否真的让我们更幸福？或许答案因人而异，但值得每个人深思。
与此同时，自然界的节奏始终如一。春天花开，夏日蝉鸣，秋叶飘落，冬雪覆盖——四季轮回从不因人类的忙碌而改变。走进山林，呼吸一口清新的空气，感受微风拂过脸颊，心灵仿佛被洗涤一般澄澈。越来越多的人开始意识到，回归自然不是逃避现实，而是为了更好地面对生活。
此外，内心的平静同样重要。冥想、阅读、书写，甚至只是静静地泡一杯茶，都能成为连接自我与世界的桥梁。在这个信息爆炸的时代，学会“断舍离”不仅是对物质的取舍，更是对精神空间的整理。唯有留出空白，才能容纳新的灵感与力量。
总之，生活的意义不仅在于追逐目标，更在于享受过程。不妨偶尔放慢脚步，聆听内心的声音，感受自然的脉动。也许你会发现，真正的幸福，就藏在那些看似平凡却充满温度的日常细节里。正如一句古老的谚语所说：“走得再远，也不要忘记为何出发。”愿我们都能在纷繁世界中，守住内心的宁静与热爱。
fjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjsfjdlsfjlsdjfsdlkfjdslfjsdlfjsdlkfjsdlfjsldfjsdlkfjsdklfjsdlfjsdlfjs
张三
`
}, 4000)

const topEvent = () => {
  console.log('触发顶部事件')
}
const bottomEvent = () => {
  console.log('触发底部事件')
}
const leftEvent = () => {
  console.log('触发左部事件')
}
const rightEvent = () => {
  console.log('触发右部事件')
}

const anchors = [
  { title: '基础', href: '#fl-scrollbar-basic' },
  { title: '属性', href: '#fl-scrollbar-attrs' },
  { title: '插槽', href: '#fl-scrollbar-slots' },
  { title: '事件', href: '#fl-scrollbar-events' },
  { title: '暴露', href: '#fl-scrollbar-expose' },
]

const data = [
  { name: 'width', type: 'Number, String', default: '0', value: '', desc: '' },
  { name: 'height', type: 'Number, String', default: '0', value: '', desc: '' },
  { name: 'maxHeight', type: 'Number, String', default: '0', value: '', desc: '' },
  { name: 'maxWidth', type: 'Number, String', default: '0', value: '', desc: '' },
  { name: 'wheel', type: 'String', default: 'y', value: 'x, y', desc: '' },
  { name: 'x', type: 'Boolean', default: 'true', value: 'true, false', desc: '' },
]

const slotData = [
  { name: 'default', param: '', desc: '' },
]

const eventData = [
  { name: 'top', params: '', desc: '向上滚动事件' },
  { name: 'bottom', params: '', desc: '向下滚动事件' },
  { name: 'left', params: '', desc: '向左滚动事件' },
  { name: 'right', params: '', desc: '向右滚动事件' },
  {
    name: 'resize', params: '{ clientWidth, clientHeight, scrollWidth, scrollHeight }', desc:
      '滚动容器宽高改变触发，内部内容容器宽高改变触发'
  },
  { name: 'scroll', params: '{ top , left  }', desc: '滚动事件' },

]

const exposeData = [
  { name: 'scrollToTop', type: '函数', desc: '滚动到顶部' },
  { name: 'scrollTopInc', type: '函数:(inc)', desc: '向上滚动增加值,接受一个数字' },
  { name: 'scrollToBottom', type: '函数', desc: '滚动到底部' },
  { name: 'scrollToLeft', type: '函数', desc: '滚动到左边' },
  { name: 'scrollLeftInc', type: '函数:(inc)', desc: '向左滚动增加值,接受一个数字' },
  { name: 'scrollToRight', type: '函数', desc: '滚动到右边' },
  { name: 'getScrollContainer', type: '函数', desc: '得到内部滚动容器' },
]
</script>
