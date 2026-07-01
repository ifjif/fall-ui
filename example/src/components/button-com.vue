<template>
  <fl-container style="height:100%;width:100%;">
    <fl-main>
      <fl-scrollbar @resize="handleResize" ref="scrollbarRef" :x="false">
        <h2>按钮</h2>
        <div>
          <h3 id="button-default">默认</h3>
          <fl-button>正常</fl-button>
          <fl-button type="primary">主要</fl-button>
          <fl-button type="success">成功</fl-button>
          <fl-button type="warning">警告</fl-button>
          <fl-button type="error">错误</fl-button>
          <fl-button :styles="{
            root: {
              bg_color: 'yellow',
              bd_color: 'green',
              color: 'red',
            },
            hover: {
              bg_color: 'green',
              bd_color: 'red',
              color: 'yellow'
            },
            disabled: {
              bg_color: 'skyblue',
              bd_color: 'beige',
              color: '#532425'
            }
          }">自定义</fl-button>
        </div>
        <div>
          <h3 id="button-round">圆框</h3>
          <fl-button round>正常</fl-button>
          <fl-button type="primary" round>主要</fl-button>
          <fl-button type="success" round>成功</fl-button>
          <fl-button type="warning" round>警告</fl-button>
          <fl-button type="error" round>错误</fl-button>
          <fl-button round :styles="{
            root: {
              bg_color: 'yellow',
              bd_color: 'green',
              color: 'red',
            },
            hover: {
              bg_color: 'green',
              bd_color: 'red',
              color: 'yellow'
            },
            disabled: {
              bg_color: 'skyblue',
              bd_color: 'beige',
              color: '#532425'
            }
          }">自定义</fl-button>
        </div>
        <div>
          <h3 id="button-disabled">禁用</h3>
          <fl-button disabled>正常</fl-button>
          <fl-button type="primary" disabled>主要</fl-button>
          <fl-button type="success" disabled>成功</fl-button>
          <fl-button type="warning" disabled>警告</fl-button>
          <fl-button type="error" disabled>错误</fl-button>
          <fl-button disabled :styles="{
            root: {
              bg_color: 'yellow',
              bd_color: 'green',
              color: 'red',
            },
            hover: {
              bg_color: 'green',
              bd_color: 'red',
              color: 'yellow'
            },
            disabled: {
              bg_color: 'skyblue',
              bd_color: 'beige',
              color: '#532425'
            }
          }">自定义</fl-button>
        </div>
        <div>
          <h3 id="button-border">边框</h3>
          <fl-button border>正常</fl-button>
          <fl-button type="primary" border>主要</fl-button>
          <fl-button type="success" border>成功</fl-button>
          <fl-button type="warning" border>警告</fl-button>
          <fl-button type="error" border>错误</fl-button>
          <fl-button border :styles="{
            root: {
              bg_color: 'yellow',
              bd_color: 'green',
              color: 'red',
            },
            hover: {
              bg_color: 'green',
              bd_color: 'red',
              color: 'yellow'
            },
            disabled: {
              bg_color: 'skyblue',
              bd_color: 'beige',
              color: '#532425'
            }
          }">自定义</fl-button>
        </div>
        <div>
          <h3 id="button-dashed">点边框</h3>
          <fl-button dashed>正常</fl-button>
          <fl-button type="primary" dashed>主要</fl-button>
          <fl-button type="success" dashed>成功</fl-button>
          <fl-button type="warning" dashed>警告</fl-button>
          <fl-button type="error" dashed>错误</fl-button>
          <fl-button dashed :styles="{
            root: {
              bg_color: 'yellow',
              bd_color: 'green',
              color: 'red',
            },
            hover: {
              bg_color: 'green',
              bd_color: 'red',
              color: 'yellow'
            },
            disabled: {
              bg_color: 'skyblue',
              bd_color: 'beige',
              color: '#532425'
            }
          }">自定义</fl-button>
        </div>
        <div>
          <h3 id="button-text">文字</h3>
          <fl-button text>正常</fl-button>
          <fl-button type="primary" text>主要</fl-button>
          <fl-button type="success" text>成功</fl-button>
          <fl-button type="warning" text>警告</fl-button>
          <fl-button type="error" text>错误</fl-button>
          <fl-button text :styles="{
            root: {
              bg_color: 'yellow',
              bd_color: 'green',
              color: 'red',
            },
            hover: {
              bg_color: 'green',
              bd_color: 'red',
              color: 'yellow'
            },
            disabled: {
              bg_color: 'skyblue',
              bd_color: 'beige',
              color: '#532425'
            }
          }">自定义</fl-button>
        </div>
        <div>
          <h3 id="button-text-disabled">文字禁用</h3>
          <fl-button text disabled>正常</fl-button>
          <fl-button type="primary" text disabled>主要</fl-button>
          <fl-button type="success" text disabled>成功</fl-button>
          <fl-button type="warning" text disabled>警告</fl-button>
          <fl-button type="error" text disabled>错误</fl-button>
          <fl-button text disabled :styles="{
            root: {
              bg_color: 'yellow',
              bd_color: 'green',
              color: 'red',
            },
            hover: {
              bg_color: 'green',
              bd_color: 'red',
              color: 'yellow'
            },
            disabled: {
              bg_color: 'skyblue',
              bd_color: 'beige',
              color: '#532425'
            }
          }">自定义</fl-button>
        </div>
        <div>
          <h3 id="button-link">链接</h3>
          <fl-button link>正常</fl-button>
          <fl-button type="primary" link>主要</fl-button>
          <fl-button type="success" link>成功</fl-button>
          <fl-button type="warning" link>警告</fl-button>
          <fl-button type="error" link>错误</fl-button>
          <fl-button link :styles="{
            root: {
              bg_color: 'yellow',
              bd_color: 'green',
              color: 'red',
            },
            hover: {
              bg_color: 'green',
              bd_color: 'red',
              color: 'yellow'
            },
            disabled: {
              bg_color: 'skyblue',
              bd_color: 'beige',
              color: '#532425'
            }
          }">自定义</fl-button>
        </div>
        <div>
          <h3 id="button-link-disabled">链接禁用</h3>
          <fl-button link disabled>正常</fl-button>
          <fl-button type="primary" link disabled>主要</fl-button>
          <fl-button type="success" link disabled>成功</fl-button>
          <fl-button type="warning" link disabled>警告</fl-button>
          <fl-button type="error" link disabled>错误</fl-button>
          <fl-button link disabled :styles="{
            root: {
              bg_color: 'yellow',
              bd_color: 'green',
              color: 'red',
            },
            hover: {
              bg_color: 'green',
              bd_color: 'red',
              color: 'yellow'
            },
            disabled: {
              bg_color: 'skyblue',
              bd_color: 'beige',
              color: '#532425'
            }
          }">自定义</fl-button>
        </div>
        <div>
          <h3 id="button-circle">圆形</h3>
          <fl-button circle></fl-button>
          <fl-button type="primary" circle></fl-button>
          <fl-button type="success" circle></fl-button>
          <fl-button type="warning" circle></fl-button>
          <fl-button type="error" circle></fl-button>
        </div>
        <div>
          <h3 id="button-size">大小</h3>
          <div>
            <h4 id="button-size-small">小</h4>
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
            <h4 id="button-size-default">默认</h4>
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
            <h4 id="button-size-large">大</h4>
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
          <div>
            <h4 id="button-size-scale">自伸缩</h4>
            <fl-button scale="0.6">0.6倍</fl-button>
            <fl-button scale="1.5" type="primary">
              <fl-icon>
                <FlCheckCircle />
              </fl-icon>
              1.5倍</fl-button>
            <fl-button scale="2" type="success">2倍</fl-button>
          </div>
          <div :style="{ width: '200px' }">
            <h3 id="button-block">块</h3>
            <fl-button block>正常</fl-button>
            <fl-button type="primary" block>主要</fl-button>
            <fl-button type="success" block>成功</fl-button>
            <fl-button type="warning" block>警告</fl-button>
            <fl-button type="error" block>错误</fl-button>
          </div>
          <div>
            <h3 id="button-with-icon">带图标</h3>
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
            <h3 id="button-loading">加载</h3>
            <fl-button loading>正常</fl-button>
            <fl-button type="primary" loading>主要</fl-button>
            <fl-button type="success" loading>成功</fl-button>
            <fl-button type="warning" @click="handleClick2">警告</fl-button>
            <fl-button type="error" :beforeChange="handleClick">错误</fl-button>
          </div>
          <div>
            <h3 id="button-in-group">按钮组</h3>
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

        <h3 id="button-props-detail">属性说明</h3>
        <div :style="{ width: `${tableWidth}px` }">
          <fl-table row-key="prop" stripe :data="data" :columns="columns"></fl-table>
        </div>
      </fl-scrollbar>
    </fl-main>

    <fl-aside style="width:200px;">
      <fl-anchor :container="scrollContaner" :data="anchors"></fl-anchor>
    </fl-aside>
  </fl-container>

</template>

<script setup>
import { ref, computed } from 'vue'
const tableWidth = ref(0)
const handleResize = ({ clientWidth }) => {
  tableWidth.value = clientWidth
}

const scrollbarRef = ref(null)
const scrollContaner = computed(() => {
  if (!scrollbarRef.value) return null
  return scrollbarRef.value.getScrollContainer()
})

const anchors = [
  { title: '默认', href: '#button-default' },
  { title: '圆框', href: '#button-round' },
  { title: '禁用', href: '#button-disabled' },
  { title: '边框', href: '#button-border' },
  { title: '点边框', href: '#button-dashed' },
  { title: '文字', href: '#button-text' },
  { title: '文字禁用', href: '#button-text-disabled' },
  { title: '链接', href: '#button-link' },
  { title: '链接禁用', href: '#button-link-disabled' },
  { title: '圆形', href: '#button-circle' },
  {
    title: '大小', href: '#button-size',
    children: [
      { title: '小', href: '#button-size-small' },
      { title: '默认', href: '#button-size-default' },
      { title: '大', href: '#button-size-large' },
      { title: '自伸缩', href: 'button-size-scale' },
    ]
  },
  { title: '块', href: '#button-block' },
  { title: '带图标', href: '#button-with-icon' },
  { title: '加载', href: '#button-loading' },
  { title: '按钮组', href: '#button-in-group' },
  { title: '属性说明', href: '#button-props-detail' },

]
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

const columns = [
  {
    prop: 'name',
    label: '属性名',
    width: '100px'
  },
  {
    prop: 'type',
    label: '类型',
    width: '100px'
  },
  {
    prop: 'default',
    label: '默认值',
    width: '100px'
  },
  {
    prop: 'value',
    label: '可选值',
    width: '100px'
  },
]
const data = [
  { name: 'type', type: 'String', default: '', value: 'primary、success、warning、error' },
  { name: 'round', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'disabled', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'border', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'dashed', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'text', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'link', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'circle', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'block', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'loading', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'size', type: 'String', default: '', value: 'small、large' },
  { name: 'scale', type: 'String,Number', default: '1', value: '' },
  { name: 'styles', type: 'Object', default: '', value: '{root:{bg_color:xx,bd_color:xx,color:xx}, hover:{bg_color:xx,bd_color:xx,color:xx}, disabled:{bg_color:xx,bd_color:xx,color:xx}}' },
  { name: 'beforeChange', type: 'Function', default: '', value: '' },
]

</script>
