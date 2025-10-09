<template>
  <p>通过prepend和append属性来添加前置文本和后置文本</p>
  <fl-input prepend="https://" append=".com"></fl-input>
  <p>通过prepend和append插槽来添加前置和后置信息</p>
  <fl-input>
    <template #prepend>
      <fl-button>前置按钮</fl-button>
    </template>
    <template #append>
      <fl-button>后置按钮</fl-button>
    </template>
  </fl-input>
  <fl-input>
    <template #prepend>
      前置插槽文本
    </template>
    <template #append>
      后置插槽文本
    </template>
  </fl-input>
</template>
