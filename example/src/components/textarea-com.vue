<template>
  <h2>文本框</h2>
  <div>
    <fl-textarea rows="10" maxlength="400" count clear>
      <template #prefix>
        <fl-icon>
          <FlEye />
        </fl-icon>
        <fl-button text type="primary">查看</fl-button>
      </template>
      <template #suffixLeft>
        <fl-button text type="primary">查看</fl-button>
      </template>
      <template #suffixRight>
        <fl-button type="primary">发送</fl-button>
      </template>
    </fl-textarea>
  </div>
</template>
