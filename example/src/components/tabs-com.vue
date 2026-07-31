<template>
  <ComponentLayout :anchors="anchors">
    <h2>tabs</h2>
    <div>
      <h3 id="fl-tabs-basic-top">基础下划线模式top（带关闭）</h3>
      <fl-tabs v-model="activeTab1" closable @tab-remove="handleRemove">
        <fl-tab-pane label="用户管理" name="first" closable>
          这里是用户管理内容...
        </fl-tab-pane>
        <fl-tab-pane label="配置中心" name="second" closable>
          这里是配置中心内容...
        </fl-tab-pane>
        <fl-tab-pane label="角色权限" name="third" disabled>
          这里是角色权限的内容...
        </fl-tab-pane>
      </fl-tabs>
    </div>

    <div>
      <h3 id="fl-tabs-basic-bottom">基础下划线模式bottom（带关闭）</h3>
      <fl-tabs v-model="activeTab1" tabPosition="bottom" closable @tab-remove="handleRemove">
        <fl-tab-pane label="用户管理" name="first" closable>
          这里是用户管理内容...
        </fl-tab-pane>
        <fl-tab-pane label="配置中心" name="second" closable>
          这里是配置中心内容...
        </fl-tab-pane>
        <fl-tab-pane label="角色权限" name="third" disabled>
          这里是角色权限的内容...
        </fl-tab-pane>
      </fl-tabs>
    </div>

    <div>
      <h3 id="fl-tabs-basic-left">基础下划线模式left（带关闭）</h3>
      <fl-tabs v-model="activeTab1" tabPosition="left" closable @tab-remove="handleRemove">
        <fl-tab-pane label="用户管理" name="first" closable>
          这里是用户管理内容...
        </fl-tab-pane>
        <fl-tab-pane label="配置中心" name="second" closable>
          这里是配置中心内容...
        </fl-tab-pane>
        <fl-tab-pane label="角色权限" name="third" disabled>
          这里是角色权限的内容...
        </fl-tab-pane>
      </fl-tabs>
    </div>

    <div>
      <h3 id="fl-tabs-basic-right">基础下划线模式right（带关闭）</h3>
      <fl-tabs v-model="activeTab1" tabPosition="right" closable @tab-remove="handleRemove">
        <fl-tab-pane label="用户管理" name="first" closable>
          这里是用户管理内容...
        </fl-tab-pane>
        <fl-tab-pane label="配置中心" name="second" closable>
          这里是配置中心内容...
        </fl-tab-pane>
        <fl-tab-pane label="角色权限" name="third" disabled>
          这里是角色权限的内容...
        </fl-tab-pane>
      </fl-tabs>
    </div>

    <div>
      <h3 id="fl-tabs-card-top">卡片模式top（可新增）</h3>
      <fl-tabs v-model="activeTab2" type="card" addable @tab-add="handleAdd" @tab-remove="handleRemove2">
        <fl-tab-pane v-for="tab in cardTabs" :key="tab.name" :label="tab.label" :name="tab.name" closable>
          {{ tab.content }}
        </fl-tab-pane>
      </fl-tabs>
    </div>

    <div>
      <h3 id="fl-tabs-card-bottom">卡片模式bottom（可新增）</h3>
      <fl-tabs v-model="activeTab2" tabPosition="bottom" type="card" addable @tab-add="handleAdd"
        @tab-remove="handleRemove2">
        <fl-tab-pane v-for="tab in cardTabs" :key="tab.name" :label="tab.label" :name="tab.name" closable>
          {{ tab.content }}
        </fl-tab-pane>
      </fl-tabs>
    </div>
    <div>
      <h3 id="fl-tabs-card-left">卡片模式left（可新增）</h3>
      <fl-tabs v-model="activeTab2" tabPosition="left" type="card" addable @tab-add="handleAdd"
        @tab-remove="handleRemove2">
        <fl-tab-pane v-for="tab in cardTabs" :key="tab.name" :label="tab.label" :name="tab.name" closable>
          {{ tab.content }}
        </fl-tab-pane>
      </fl-tabs>
    </div>

    <div>
      <h3 id="fl-tabs-card-right">卡片模式right（可新增）</h3>
      <fl-tabs v-model="activeTab2" tabPosition="right" type="card" addable @tab-add="handleAdd"
        @tab-remove="handleRemove2">
        <fl-tab-pane v-for="tab in cardTabs" :key="tab.name" :label="tab.label" :name="tab.name" closable>
          {{ tab.content }}
        </fl-tab-pane>
      </fl-tabs>
    </div>

    <div>
      <h3 id="fl-tabs-border-card-top">边框卡片模式top</h3>
      <fl-tabs v-model="activeTab3" type="border-card">
        <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
        <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
      </fl-tabs>
    </div>

    <div>
      <h3 id="fl-tabs-border-card-bottom">边框卡片模式bottom</h3>
      <fl-tabs v-model="activeTab3" tabPosition="bottom" type="border-card">
        <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
        <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
      </fl-tabs>
    </div>

    <div>
      <h3 id="fl-tabs-border-card-left">边框卡片模式left</h3>
      <fl-tabs v-model="activeTab3" tabPosition="left" type="border-card">
        <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
        <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
      </fl-tabs>
    </div>

    <div>
      <h3 id="fl-tabs-border-card-right">边框卡片模式right</h3>
      <fl-tabs v-model="activeTab3" tabPosition="right" type="border-card">
        <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
        <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
      </fl-tabs>
    </div>

    <h3 id="fl-tabs-self">自定义</h3>
    <fl-tabs addable v-model="activeTab3" :styles="styles">
      <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
      <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
      <fl-tab-pane label="禁止" name="dis" disabled>禁用</fl-tab-pane>
    </fl-tabs>

    <fl-tabs addable v-model="activeTab3" type="card" :styles="styles">
      <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
      <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
      <fl-tab-pane label="禁止" name="dis" disabled>禁用</fl-tab-pane>
    </fl-tabs>

    <fl-tabs addable v-model="activeTab3" type="border-card" :styles="styles">
      <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
      <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
      <fl-tab-pane label="禁止" name="dis" disabled>禁用</fl-tab-pane>
    </fl-tabs>

    <h3 id="fl-tabs-attrs">tabs属性</h3>
    <fl-table :data="data" :columns="columns">
      <template #value="{ row }">
        <pre>{{ row.value }}</pre>
      </template>
    </fl-table>

    <h3 id="fl-tabs-models">tabs model</h3>
    <fl-table :data="modelData" :columns="columns">
    </fl-table>

    <h3 id="fl-tabs-slots">tabs插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns">
    </fl-table>

    <h3 id="fl-tabs-events">tabs事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>

    <h3 id="fl-tab-pane-attrs">tab-pane属性</h3>
    <fl-table :data="paneData" :columns="columns"></fl-table>
    <h3 id="fl-tab-pane-slots">tab-pane插槽</h3>
    <fl-table :data="paneSlotData" :columns="slotColumns"></fl-table>

    <!--内外宽高, border一致, 如想要内border覆盖外border, 内margin-top:-1, margin-left:-1 即可 -->
    <div style="width:20px;height:20px;border:1px solid red;">
      <div style="width:20px;height:20px;border:1px solid yellow;margin:-1px 0 0 -1px;">a</div>
    </div>
  </ComponentLayout>

</template>
<script setup>
import { columns, eventColumns, slotColumns } from '@/assets/com-props'
import ComponentLayout from '@/layout/component-layout.vue'
import { ref } from 'vue'
const activeTab1 = ref('first')
const handleRemove = (name) => {
  console.log('移除了：', name)
}

const activeTab2 = ref('1')
const cardTabs = ref([
  { name: '1', label: '标签1', content: '内容1' },
  { name: '2', label: '标签2', content: '内容2' }
])

const handleAdd = () => {
  const newTab = {
    name: String(cardTabs.value.length + 1),
    label: `新标签 ${cardTabs.value.length + 1}`,
    content: `这是新内容`
  }
  cardTabs.value.push(newTab)
  activeTab2.value = newTab.name
}

const handleRemove2 = (name) => {
  const i = cardTabs.value.findIndex(t => t.name === name)
  if (i !== -1) {
    cardTabs.value.splice(i, 1)
  }
}

const activeTab3 = ref('safe')

const styles = {
  root: {
    color: 'yellow',
    bg_color: 'red',
    bd_color: 'blue',
    btn_color: 'skyblue',
    btn_bg_color: 'beige',
    nav_bg_color: 'green',
    btn_bg_color: 'yellow',
    btn_color: 'red',
  },
  disabled: {
    color: 'gray'
  },
  hover: {
    color: '#000'
  },
  active: {
    color: 'purple',
    nav_bg_color: '#000',
    bar_color: 'red',
  },
}

const anchors = [
  { title: "基础下划线模式top(带关闭)", href: "#fl-tabs-basic-top" },
  { title: "基础下划线模式bottom(带关闭)", href: "#fl-tabs-basic-bottom" },
  { title: "基础下划线模式left(带关闭)", href: "#fl-tabs-basic-left" },
  { title: "基础下划线模式right(带关闭)", href: "#fl-tabs-basic-right" },
  { title: "卡片模式top(可新增)", href: "#fl-tabs-card-top" },
  { title: "卡片模式bottom(可新增)", href: "#fl-tabs-card-bottom" },
  { title: "卡片模式left(可新增)", href: "#fl-tabs-card-left" },
  { title: "卡片模式right(可新增)", href: "#fl-tabs-card-right" },
  { title: "边框卡片模式top", href: "#fl-tabs-border-card-top" },
  { title: "边框卡片模式bottom", href: "#fl-tabs-border-card-bottom" },
  { title: "边框卡片模式left", href: "#fl-tabs-border-card-left" },
  { title: "边框卡片模式right", href: "#fl-tabs-border-card-right" },
  { title: "自定义", href: "#fl-tabs-self" },
  { title: "tabs属性", href: "#fl-tabs-attrs" },
  { title: "tabs model", href: "#fl-tabs-models" },
  { title: "tabs插槽", href: "#fl-tabs-slots" },
  { title: "tabs事件", href: "#fl-tabs-events" },
  { title: "tab-pane属性", href: "#fl-tab-pane-attrs" },
  { title: "tab-pane插槽", href: "#fl-tab-pane-slots" },
]


const astyles = {
  root: {
    color: '',
    bg_color: '',
    bd_color: '',
    btn_color: '',
    btn_bg_color: '',
    nav_bg_color: '',
    btn_bg_color: '',
    btn_color: '',
  },
  disabled: {
    color: '',
  },
  hover: {
    color: '',
  },
  active: {
    color: '',
    nav_bg_color: '',
    bar_color: '',
  },
}

const data = [
  { name: 'type', type: 'String', default: '', value: 'card, border-card', desc: '' },
  { name: 'addable', type: 'Boolean', default: 'false', value: 'true, false', desc: '' },
  { name: 'tabPosition', type: 'String', default: 'top', value: 'top, bottom, left, right', desc: '' },
  { name: 'onlyHeader', type: 'Boolean', default: 'false', value: 'true, false', desc: '' },
  { name: 'styles', type: 'Object', default: '', value: JSON.stringify(astyles, null, 2), desc: '' },
]

const modelData = [
  { name: '', type: 'String, Number', default: '', value: '', desc: '活跃的tab-pane的name' },
]
const slotData = [
  { name: 'default', param: '', desc: '' },
]

const eventData = [
  { name: 'tab-add', params: '', desc: '添加事件' },
  { name: 'tab-remove', params: '(name)', desc: '移除事件' }

]

const paneData = [
  { name: 'name', type: 'String, Number', default: '', value: '', desc: 'pane名字，唯一标识' },
  { name: 'label', type: 'String', default: '', value: '', desc: '显示文字' },
  { name: 'disabled', type: 'Boolean', default: 'false', value: 'true, false', desc: '是否禁止' },
  { name: 'closable', type: 'Boolean', default: 'false', value: 'true, false', desc: '是否可关闭' },
]
const paneSlotData = [
  { name: 'default', param: '', desc: '' },
]
</script>
<style scoped>
.aa {
  --bac-a: yellow;
}
</style>
