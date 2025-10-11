<template>
  <p>使用prefix插槽添加上内容</p>
  <fl-textarea placeholder="primary">
    <template #prefix>
      <fl-icon>
        <FlSearch />
      </fl-icon>
      <fl-button text>按钮</fl-button>
    </template>
  </fl-textarea>
  <p>使用suffixLeft和suffixRight插槽添加下内容</p>
  <p>这里的left和right是对于count和clear属性内容的</p>
  <p>left是在count和clear属性的左边，而right是在count和clear属性的右边</p>
  <fl-textarea count clear maxlength="200" placeholder="primary">
    <template #suffixLeft>
      <fl-button>按钮</fl-button>
    </template>
    <template #suffixRight>
      <fl-button type="primary">发送</fl-button>
    </template>
  </fl-textarea>
</template>
