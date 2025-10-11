# radio组件

## type属性

:::demo type属性指定选中主题，可选：primary(默认)、success、warning、error

```html
radio/index
```

:::

## label属性

:::demo label属性指定提示文本

```html
radio/label
```

:::

## value属性

:::demo value属性指定值

```html
radio/value
```

:::

## disabled属性

:::demo disabled属性禁用（无法选择）

```html
radio/disabled
```

:::

## 加载状态

:::demo 加载状态

```html
radio/loading
```

:::

## 事件

:::demo 事件

```html
radio/event
```

:::

## 单选框组

:::demo 单选框组

```html
radio/group
```

:::

## 事件

:::demo 单选框组事件

```html
radio/group-event
```

:::

## 尺寸

:::demo 尺寸 size属性，可选值：small、default(默认不用设置) 、large

```html
radio/size
```

:::

## 单选框属性

| 属性名       | 类型                    | 默认值  | 可选值                             | 说明         |
| ------------ | ----------------------- | ------- | ---------------------------------- | ------------ |
| type         | String                  | `无`    | `primary、success、error、warning` | 主题色       |
| label        | String、Number          | 无      |                                    | 右侧文本信息 |
| value        | String、Number、Boolean | 无      |                                    | 多选框值     |
| disabled     | Boolean                 | `false` | `true、false`                      | 是否禁用     |
| loading      | Boolean                 | `false` | `true、false`                      | 实现显示加载 |
| size         | String                  | `无`    | `small、default(不需要写)、large`  | 大小         |
| beforeChange | Function                | `无`    | `Function():Promise<any>`          | 异步处理函数 |

## 单选框双向绑定

| 指令    | 类型                    | 默认值 | 可选值 | 说明     |
| ------- | ----------------------- | ------ | ------ | -------- |
| v-model | String、Number、Boolean | `无`   |        | 双向绑定 |

## 单选框事件

| 事件名 | 参数                          | 说明       |
| ------ | ----------------------------- | ---------- |
| change | `(value:是否选中true或false)` | change事件 |

## 单选框组属性

| 属性名 | 类型   | 默认值 | 可选值                            | 说明 |
| ------ | ------ | ------ | --------------------------------- | ---- |
| size   | String | `无`   | `small、default(不需要写)、large` | 大小 |

## 单选框组双向绑定

| 指令    | 类型                    | 默认值 | 可选值 | 说明     |
| ------- | ----------------------- | ------ | ------ | -------- |
| v-model | String、Number、Boolean | `无`   |        | 双向绑定 |

## 多选框组事件

| 事件名 | 参数                         | 说明       |
| ------ | ---------------------------- | ---------- |
| change | `(value:组中数据改变后的值)` | change事件 |
