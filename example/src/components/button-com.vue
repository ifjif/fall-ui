<template>
  <h2>按钮</h2>
  <div>
    <h3>默认</h3>
    <a-button>正常</a-button>
    <a-button type="primary">主要</a-button>
    <a-button type="success">成功</a-button>
    <a-button type="warning">警告</a-button>
    <a-button type="error">错误</a-button>
  </div>
  <div>
    <h3>圆框</h3>
    <a-button round>正常</a-button>
    <a-button type="primary" round>主要</a-button>
    <a-button type="success" round>成功</a-button>
    <a-button type="warning" round>警告</a-button>
    <a-button type="error" round>错误</a-button>
  </div>
  <div>
    <h3>禁用</h3>
    <a-button disabled>正常</a-button>
    <a-button type="primary" disabled>主要</a-button>
    <a-button type="success" disabled>成功</a-button>
    <a-button type="warning" disabled>警告</a-button>
    <a-button type="error" disabled>错误</a-button>
  </div>
  <div>
    <h3>边框</h3>
    <a-button border>正常</a-button>
    <a-button type="primary" border>主要</a-button>
    <a-button type="success" border>成功</a-button>
    <a-button type="warning" border>警告</a-button>
    <a-button type="error" border>错误</a-button>
  </div>
  <div>
    <h3>点边框</h3>
    <a-button dashed>正常</a-button>
    <a-button type="primary" dashed>主要</a-button>
    <a-button type="success" dashed>成功</a-button>
    <a-button type="warning" dashed>警告</a-button>
    <a-button type="error" dashed>错误</a-button>
  </div>
  <div>
    <h3>文字</h3>
    <a-button text>正常</a-button>
    <a-button type="primary" text>主要</a-button>
    <a-button type="success" text>成功</a-button>
    <a-button type="warning" text>警告</a-button>
    <a-button type="error" text>错误</a-button>
  </div>
  <div>
    <h3>文字禁用</h3>
    <a-button text disabled>正常</a-button>
    <a-button type="primary" text disabled>主要</a-button>
    <a-button type="success" text disabled>成功</a-button>
    <a-button type="warning" text disabled>警告</a-button>
    <a-button type="error" text disabled>错误</a-button>
  </div>
  <div>
    <h3>链接</h3>
    <a-button link>正常</a-button>
    <a-button type="primary" link>主要</a-button>
    <a-button type="success" link>成功</a-button>
    <a-button type="warning" link>警告</a-button>
    <a-button type="error" link>错误</a-button>
  </div>
  <div>
    <h3>链接禁用</h3>
    <a-button link disabled>正常</a-button>
    <a-button type="primary" link disabled>主要</a-button>
    <a-button type="success" link disabled>成功</a-button>
    <a-button type="warning" link disabled>警告</a-button>
    <a-button type="error" link disabled>错误</a-button>
  </div>
  <div>
    <h3>圆形</h3>
    <a-button circle></a-button>
    <a-button type="primary" circle></a-button>
    <a-button type="success" circle></a-button>
    <a-button type="warning" circle></a-button>
    <a-button type="error" circle></a-button>
  </div>
  <div>
    <h3>大小</h3>
    <div>
      <h4>小</h4>
      <div>
        <a-button circle size="small">
          <a-icon>
            <ACheckCircle />
          </a-icon>
        </a-button>
        <a-button type="primary" circle size="small"></a-button>
        <a-button type="success" circle size="small"></a-button>
        <a-button type="warning" circle size="small"></a-button>
        <a-button type="error" circle size="small"></a-button>
      </div>
      <div>
        <a-button size="small">正常</a-button>
        <a-button type="primary" size="small">
          <a-icon>
            <ACheckCircle />
          </a-icon>
          主要</a-button>
        <a-button type="success" size="small">成功</a-button>
        <a-button type="warning" size="small">警告</a-button>
        <a-button type="error" size="small">错误</a-button>
      </div>
    </div>
    <div>
      <h4>默认</h4>
      <div>
        <a-button circle></a-button>
        <a-button type="primary" circle>
          <a-icon>
            <ACheckCircle />
          </a-icon>
        </a-button>
        <a-button type="success" circle></a-button>
        <a-button type="warning" circle></a-button>
        <a-button type="error" circle></a-button>
      </div>
      <div>
        <a-button>正常</a-button>
        <a-button type="primary">主要</a-button>
        <a-button type="success">
          <a-icon>
            <ACheckCircle />
          </a-icon>
          成功</a-button>
        <a-button type="warning">警告</a-button>
        <a-button type="error">错误</a-button>
      </div>
    </div>
    <div>
      <h4>大</h4>
      <div>
        <a-button circle></a-button>
        <a-button type="primary" circle size="large"></a-button>
        <a-button type="success" circle size="large">
          <a-icon>
            <ACheckCircle />
          </a-icon>
        </a-button>
        <a-button type="warning" circle size="large"></a-button>
        <a-button type="error" circle size="large"></a-button>
      </div>
      <div>
        <a-button size="large">正常</a-button>
        <a-button type="primary" size="large">主要</a-button>
        <a-button type="success" size="large">成功</a-button>
        <a-button type="warning" size="large">
          <a-icon>
            <ACheckCircle />
          </a-icon>
          警告
        </a-button>
        <a-button type="error" size="large">错误</a-button>
      </div>
    </div>
    <div :style="{ width: '200px' }">
      <h3>块</h3>
      <a-button block>正常</a-button>
      <a-button type="primary" block>主要</a-button>
      <a-button type="success" block>成功</a-button>
      <a-button type="warning" block>警告</a-button>
      <a-button type="error" block>错误</a-button>
    </div>
    <div>
      <h3>带图标</h3>
      <a-button>
        <a-icon>
          <ACheckCircle />
        </a-icon>
        正常
        <a-icon>
          <ACheckCircle />
        </a-icon>
      </a-button>
      <a-button type="primary">主要</a-button>
      <a-button type="success">成功</a-button>
      <a-button type="warning">警告</a-button>
      <a-button type="error">错误</a-button>
    </div>
    <div>
      <h3>加载</h3>
      <a-button loading>正常</a-button>
      <a-button type="primary" loading>主要</a-button>
      <a-button type="success" loading>成功</a-button>
      <a-button type="warning" @click="handleClick2">警告</a-button>
      <a-button type="error" :beforeChange="handleClick">错误</a-button>
    </div>
    <div>
      <h3>按钮组</h3>
      <a-button-group size="small">
        <a-button>正常</a-button>
        <a-button>正常</a-button>
      </a-button-group>
      <a-button-group>
        <a-button type="primary">主要</a-button>
        <a-button type="success">成功</a-button>
      </a-button-group>
      <a-button-group size="large">
        <a-button type="success">成功</a-button>
        <a-button type="warning">警告</a-button>
      </a-button-group>
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
