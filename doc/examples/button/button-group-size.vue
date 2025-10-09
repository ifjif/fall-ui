<template>
  <p>小</p>
  <fl-button-group size="small">
  <fl-button>默认</fl-button>
  <fl-button type="primary">primary</fl-button>
  <fl-button type="success">success</fl-button>
  <fl-button type="warning">warning</fl-button>
  <fl-button type="error">error</fl-button>
  </fl-button-group>
  <p>默认</p>
  <fl-button-group>
  <fl-button>默认</fl-button>
  <fl-button type="primary">primary</fl-button>
  <fl-button type="success">success</fl-button>
  <fl-button type="warning">warning</fl-button>
  <fl-button type="error">error</fl-button>
  </fl-button-group>
  <p>大</p>
  <fl-button-group size="large">
  <fl-button>默认</fl-button>
  <fl-button type="primary">primary</fl-button>
  <fl-button type="success">success</fl-button>
  <fl-button type="warning">warning</fl-button>
  <fl-button type="error">error</fl-button>
  </fl-button-group>
  <p>当按钮组和组中按钮都有大小，优先采用按钮大小，如果按钮没有设置大小则采用按钮组大小</p>
  <fl-button-group size="small">
  <fl-button>默认</fl-button>
  <fl-button  type="primary">primary</fl-button>
  <fl-button size="default" type="success">success</fl-button>
  <fl-button size="large" type="warning">warning</fl-button>
  <fl-button type="error">error</fl-button>
  </fl-button-group>
</template>
