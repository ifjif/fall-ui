<template>
  <ComponentLayout :anchors="anchors">
    <h2>布局</h2>
    <div style="height: 400px;display: flex;flex-direction: column;">
      <h3 id="fl-layout-layout1">布局1</h3>
      <fl-container class="gray">
        <fl-header height="60" class="skyblue">
          header
        </fl-header>
        <fl-container class="gray">
          <fl-aside width="80" class="yellow">
            <fl-scrollbar>
              <div style="height: 500px;">aside</div>
            </fl-scrollbar>
          </fl-aside>
          <fl-main class="beige">
            <fl-scrollbar>
              <div style="height: 500px;width: 1000px;">main</div>
            </fl-scrollbar>
          </fl-main>
        </fl-container>
        <fl-footer height="60" class="skyblue">
          footer
        </fl-footer>
      </fl-container>
    </div>
    <div style="height: 400px;display: flex;flex-direction: column;">
      <h3 id="fl-layout-layout2">布局2</h3>
      <fl-container class="gray">
        <fl-aside width="80" class="yellow">
          <fl-scrollbar>
            <div style="height: 500px;">aside</div>
          </fl-scrollbar>
        </fl-aside>
        <fl-container class="gray">
          <fl-header height="60" class="skyblue">
            header
          </fl-header>
          <fl-main class="beige">
            <fl-scrollbar>
              <div style="height: 500px;width: 1000px;">main</div>
            </fl-scrollbar>
          </fl-main>
          <fl-footer height="60" class="skyblue">
            footer
          </fl-footer>
        </fl-container>
      </fl-container>
    </div>
    <div style="height: 400px;display: flex;flex-direction: column;">
      <h3 id="fl-layout-layout3">布局3</h3>
      <fl-container class="gray">
        <fl-header height="60" class="skyblue">
          header
        </fl-header>
        <fl-container class="gray">
          <fl-aside width="80" class="yellow">
            <fl-scrollbar>
              <div style="height: 500px;">aside</div>
            </fl-scrollbar>
          </fl-aside>
          <fl-container class="gray">
            <fl-container class="gray">
              <fl-main class="beige">
                <fl-scrollbar>
                  <div style="height: 500px;width: 1000px;">main</div>
                </fl-scrollbar>
              </fl-main>
              <fl-aside width="80" class="yellow">
                <fl-scrollbar>
                  <div style="height: 500px;">aside</div>
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
    <div style="height: 400px;display: flex;flex-direction: column;">
      <h3 id="fl-layout-layout4">布局4</h3>
      <fl-container class="gray">
        <fl-aside width="80" class="yellow">
          <fl-scrollbar>
            <div style="height: 500px;">aside</div>
          </fl-scrollbar>
        </fl-aside>
        <fl-main class="beige">
          <fl-scrollbar>
            <div style="height: 500px;width: 1000px;">main</div>
          </fl-scrollbar>
        </fl-main>
        <fl-aside width="80" class="yellow">
          <fl-scrollbar>
            <div style="height: 500px;">aside</div>
          </fl-scrollbar>
        </fl-aside>
      </fl-container>
    </div>

    <h3 id="fl-layout-container-attrs">container属性</h3>
    <fl-table :data="containerData" :columns="columns"></fl-table>
    <h3 id="fl-layout-container-slots">container插槽</h3>
    <fl-table :data="containerSlotData" :columns="slotColumns"></fl-table>

    <h3 id="fl-layout-header-attrs">header属性</h3>
    <fl-table :data="headerData" :columns="columns"></fl-table>
    <h3 id="fl-layout-header-slots">header插槽</h3>
    <fl-table :data="headerSlotData" :columns="slotColumns"></fl-table>

    <h3 id="fl-layout-main-attrs">main属性</h3>
    <fl-table :columns="columns"></fl-table>
    <h3 id="fl-layout-main-slots">main插槽</h3>
    <fl-table :data="mainSlotData" :columns="slotColumns"></fl-table>

    <h3 id="fl-layout-aside-attrs">aside属性</h3>
    <fl-table :data="asideData" :columns="columns"></fl-table>
    <h3 id="fl-layout-aside-slots">aside插槽</h3>
    <fl-table :data="asideSlotData" :columns="slotColumns"></fl-table>

    <h3 id="fl-layout-footer-attrs">footer属性</h3>
    <fl-table :data="footerData" :columns="columns"></fl-table>
    <h3 id="fl-layout-footer-slots">footer插槽</h3>
    <fl-table :data="footerSlotData" :columns="slotColumns"></fl-table>
  </ComponentLayout>
</template>

<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { columns, slotColumns } from '@/assets/com-props';

const anchors = [
  { title: '布局1', href: '#fl-layout-layout1' },
  { title: '布局2', href: '#fl-layout-layout2' },
  { title: '布局3', href: '#fl-layout-layout3' },
  { title: '布局4', href: '#fl-layout-layout4' },
  { title: 'container属性', href: '#fl-layout-container-attrs' },
  { title: 'container插槽', href: '#fl-layout-container-slots' },
  { title: 'header属性', href: '#fl-layout-header-attrs' },
  { title: 'header插槽', href: '#fl-layout-header-slots' },
  { title: 'main属性', href: '#fl-layout-main-attrs' },
  { title: 'main插槽', href: '#fl-layout-main-slots' },
  { title: 'aside属性', href: '#fl-layout-aside-attrs' },
  { title: 'aside插槽', href: '#fl-layout-aside-slots' },
  { title: 'footer属性', href: '#fl-layout-footer-attrs' },
  { title: 'footer插槽', href: '#fl-layout-footer-slots' },
]

const containerData = [
  { name: 'directive', type: 'String', default: '', value: 'vertical,horizontal', desc: '' }
]

const containerSlotData = [
  { name: 'default', param: '', desc: '' },
]

const mainSlotData = [
  { name: 'default', param: '', desc: '' },
]

const headerData = [
  { name: 'height', type: 'String, Number', default: '', value: '', desc: '' }
]
const headerSlotData = [
  { name: 'default', param: '', desc: '' },
]

const asideData = [
  { name: 'width', type: 'String, Number', default: '', value: '', desc: '' }
]
const asideSlotData = [
  { name: 'default', param: '', desc: '' },
]

const footerData = [
  { name: 'height', type: 'String, Number', default: '', value: '', desc: '' }
]
const footerSlotData = [
  { name: 'default', param: '', desc: '' },
]

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
