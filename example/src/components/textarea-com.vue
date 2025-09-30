<template>
  <h2>文本框</h2>
  <div>
    <a-textarea rows="10" maxlength="400" count clear>
      <template #prefix>
        <a-icon>
          <AEye />
        </a-icon>
        <a-button text type="primary">查看</a-button>
      </template>
      <template #suffixLeft>
        <a-button text type="primary">查看</a-button>
      </template>
      <template #suffixRight>
        <a-button type="primary">发送</a-button>
      </template>
    </a-textarea>
  </div>
</template>
