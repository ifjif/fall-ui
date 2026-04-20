<template>
  <h3>tabs</h3>
  <div>
    <p>1.基础下划线模式top（带关闭）</p>
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
    <p>2.基础下划线模式bottom（带关闭）</p>
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
    <p>3.基础下划线模式left（带关闭）</p>
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
    <p>4.基础下划线模式right（带关闭）</p>
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
    <p>1.卡片模式top（可新增）</p>
    <fl-tabs v-model="activeTab2" type="card" addable @tab-add="handleAdd" @tab-remove="handleRemove2">
      <fl-tab-pane v-for="tab in cardTabs" :key="tab.name" :label="tab.label" :name="tab.name" closable>
        {{ tab.content }}
      </fl-tab-pane>
    </fl-tabs>
  </div>

  <div>
    <p>2.卡片模式bottom（可新增）</p>
    <fl-tabs v-model="activeTab2" tabPosition="bottom" type="card" addable @tab-add="handleAdd"
      @tab-remove="handleRemove2">
      <fl-tab-pane v-for="tab in cardTabs" :key="tab.name" :label="tab.label" :name="tab.name" closable>
        {{ tab.content }}
      </fl-tab-pane>
    </fl-tabs>
  </div>
  <div>
    <p>3.卡片模式left（可新增）</p>
    <fl-tabs v-model="activeTab2" tabPosition="left" type="card" addable @tab-add="handleAdd"
      @tab-remove="handleRemove2">
      <fl-tab-pane v-for="tab in cardTabs" :key="tab.name" :label="tab.label" :name="tab.name" closable>
        {{ tab.content }}
      </fl-tab-pane>
    </fl-tabs>
  </div>

  <div>
    <p>4.卡片模式right（可新增）</p>
    <fl-tabs v-model="activeTab2" tabPosition="right" type="card" addable @tab-add="handleAdd"
      @tab-remove="handleRemove2">
      <fl-tab-pane v-for="tab in cardTabs" :key="tab.name" :label="tab.label" :name="tab.name" closable>
        {{ tab.content }}
      </fl-tab-pane>
    </fl-tabs>
  </div>

  <div>
    <p>1. 边框卡片模式top</p>
    <fl-tabs v-model="activeTab3" type="border-card">
      <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
      <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
    </fl-tabs>
  </div>

  <div>
    <p>2. 边框卡片模式bottom</p>
    <fl-tabs v-model="activeTab3" tabPosition="bottom" type="border-card">
      <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
      <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
    </fl-tabs>
  </div>

  <div>
    <p>3. 边框卡片模式left</p>
    <fl-tabs v-model="activeTab3" tabPosition="left" type="border-card">
      <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
      <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
    </fl-tabs>
  </div>

  <div>
    <p>4. 边框卡片模式right</p>
    <fl-tabs v-model="activeTab3" tabPosition="right" type="border-card">
      <fl-tab-pane label="安全性" name="safe">安全性设置</fl-tab-pane>
      <fl-tab-pane label="通知" name="notify">通知设置</fl-tab-pane>
    </fl-tabs>
  </div>

  <div style="width:20px;height:20px;border:1px solid red;">
    <div style="width:20px;height:20px;border:1px solid yellow;margin:-1px -1px 0;">a</div>
  </div>
</template>
<script setup>
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
</script>
