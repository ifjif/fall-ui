<template>
  <h2>按钮</h2>
  <div>
    <h3>默认</h3>
    <fl-button>正常</fl-button>
    <fl-button type="primary">主要</fl-button>
    <fl-button type="success">成功</fl-button>
    <fl-button type="warning">警告</fl-button>
    <fl-button type="error">错误</fl-button>
  </div>
  <div>
    <h3>圆框</h3>
    <fl-button round>正常</fl-button>
    <fl-button type="primary" round>主要</fl-button>
    <fl-button type="success" round>成功</fl-button>
    <fl-button type="warning" round>警告</fl-button>
    <fl-button type="error" round>错误</fl-button>
  </div>
  <div>
    <h3>禁用</h3>
    <fl-button disabled>正常</fl-button>
    <fl-button type="primary" disabled>主要</fl-button>
    <fl-button type="success" disabled>成功</fl-button>
    <fl-button type="warning" disabled>警告</fl-button>
    <fl-button type="error" disabled>错误</fl-button>
  </div>
  <div>
    <h3>边框</h3>
    <fl-button border>正常</fl-button>
    <fl-button type="primary" border>主要</fl-button>
    <fl-button type="success" border>成功</fl-button>
    <fl-button type="warning" border>警告</fl-button>
    <fl-button type="error" border>错误</fl-button>
  </div>
  <div>
    <h3>点边框</h3>
    <fl-button dashed>正常</fl-button>
    <fl-button type="primary" dashed>主要</fl-button>
    <fl-button type="success" dashed>成功</fl-button>
    <fl-button type="warning" dashed>警告</fl-button>
    <fl-button type="error" dashed>错误</fl-button>
  </div>
  <div>
    <h3>文字</h3>
    <fl-button text>正常</fl-button>
    <fl-button type="primary" text>主要</fl-button>
    <fl-button type="success" text>成功</fl-button>
    <fl-button type="warning" text>警告</fl-button>
    <fl-button type="error" text>错误</fl-button>
  </div>
  <div>
    <h3>文字禁用</h3>
    <fl-button text disabled>正常</fl-button>
    <fl-button type="primary" text disabled>主要</fl-button>
    <fl-button type="success" text disabled>成功</fl-button>
    <fl-button type="warning" text disabled>警告</fl-button>
    <fl-button type="error" text disabled>错误</fl-button>
  </div>
  <div>
    <h3>链接</h3>
    <fl-button link>正常</fl-button>
    <fl-button type="primary" link>主要</fl-button>
    <fl-button type="success" link>成功</fl-button>
    <fl-button type="warning" link>警告</fl-button>
    <fl-button type="error" link>错误</fl-button>
  </div>
  <div>
    <h3>链接禁用</h3>
    <fl-button link disabled>正常</fl-button>
    <fl-button type="primary" link disabled>主要</fl-button>
    <fl-button type="success" link disabled>成功</fl-button>
    <fl-button type="warning" link disabled>警告</fl-button>
    <fl-button type="error" link disabled>错误</fl-button>
  </div>
  <div>
    <h3>圆形</h3>
    <fl-button circle></fl-button>
    <fl-button type="primary" circle></fl-button>
    <fl-button type="success" circle></fl-button>
    <fl-button type="warning" circle></fl-button>
    <fl-button type="error" circle></fl-button>
  </div>
  <div>
    <h3>大小</h3>
    <div>
      <h4>小</h4>
      <div>
        <fl-button circle size="small">
          <fl-icon>
            <FlCheckCircle />
          </fl-icon>
        </fl-button>
        <fl-button type="primary" circle size="small"></fl-button>
        <fl-button type="success" circle size="small"></fl-button>
        <fl-button type="warning" circle size="small"></fl-button>
        <fl-button type="error" circle size="small"></fl-button>
      </div>
      <div>
        <fl-button size="small">正常</fl-button>
        <fl-button type="primary" size="small">
          <fl-icon>
            <FlCheckCircle />
          </fl-icon>
          主要</fl-button>
        <fl-button type="success" size="small">成功</fl-button>
        <fl-button type="warning" size="small">警告</fl-button>
        <fl-button type="error" size="small">错误</fl-button>
      </div>
    </div>
    <div>
      <h4>默认</h4>
      <div>
        <fl-button circle></fl-button>
        <fl-button type="primary" circle>
          <fl-icon>
            <FlCheckCircle />
          </fl-icon>
        </fl-button>
        <fl-button type="success" circle></fl-button>
        <fl-button type="warning" circle></fl-button>
        <fl-button type="error" circle></fl-button>
      </div>
      <div>
        <fl-button>正常</fl-button>
        <fl-button type="primary">主要</fl-button>
        <fl-button type="success">
          <fl-icon>
            <FlCheckCircle />
          </fl-icon>
          成功</fl-button>
        <fl-button type="warning">警告</fl-button>
        <fl-button type="error">错误</fl-button>
      </div>
    </div>
    <div>
      <h4>大</h4>
      <div>
        <fl-button circle></fl-button>
        <fl-button type="primary" circle size="large"></fl-button>
        <fl-button type="success" circle size="large">
          <fl-icon>
            <FlCheckCircle />
          </fl-icon>
        </fl-button>
        <fl-button type="warning" circle size="large"></fl-button>
        <fl-button type="error" circle size="large"></fl-button>
      </div>
      <div>
        <fl-button size="large">正常</fl-button>
        <fl-button type="primary" size="large">主要</fl-button>
        <fl-button type="success" size="large">成功</fl-button>
        <fl-button type="warning" size="large">
          <fl-icon>
            <FlCheckCircle />
          </fl-icon>
          警告
        </fl-button>
        <fl-button type="error" size="large">错误</fl-button>
      </div>
    </div>
    <div :style="{ width: '200px' }">
      <h3>块</h3>
      <fl-button block>正常</fl-button>
      <fl-button type="primary" block>主要</fl-button>
      <fl-button type="success" block>成功</fl-button>
      <fl-button type="warning" block>警告</fl-button>
      <fl-button type="error" block>错误</fl-button>
    </div>
    <div>
      <h3>带图标</h3>
      <fl-button>
        <fl-icon>
          <FlCheckCircle />
        </fl-icon>
        正常
        <fl-icon>
          <FlCheckCircle />
        </fl-icon>
      </fl-button>
      <fl-button type="primary">主要</fl-button>
      <fl-button type="success">成功</fl-button>
      <fl-button type="warning">警告</fl-button>
      <fl-button type="error">错误</fl-button>
    </div>
    <div>
      <h3>加载</h3>
      <fl-button loading>正常</fl-button>
      <fl-button type="primary" loading>主要</fl-button>
      <fl-button type="success" loading>成功</fl-button>
      <fl-button type="warning" @click="handleClick2">警告</fl-button>
      <fl-button type="error" :beforeChange="handleClick">错误</fl-button>
    </div>
    <div>
      <h3>按钮组</h3>
      <fl-button-group size="small">
        <fl-button>正常</fl-button>
        <fl-button>正常</fl-button>
      </fl-button-group>
      <fl-button-group>
        <fl-button type="primary">主要</fl-button>
        <fl-button type="success">成功</fl-button>
      </fl-button-group>
      <fl-button-group size="large">
        <fl-button type="success">成功</fl-button>
        <fl-button type="warning">警告</fl-button>
      </fl-button-group>
    </div>
  </div>
</template>

<script setup>
const handleClick = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
const handleClick2 = (e) => {
  console.log(e)
}
</script>
