# checkbox组件

## type属性

:::demo 基础,拥有四种选中主题:primary、success、error、warning,默认为primary

```html
checkbox/index
```

:::

## label属性

:::demo label属性，可为右边设置文本信息

```html
checkbox/label
```

:::

## value属性

:::demo value属性，为多选框的值

```html
checkbox/value
```

:::

## disabled属性

:::demo disabled属性,被禁用无法点击

```html
checkbox/disabled
```

:::

## 加载状态

:::demo 加载状态

```html
checkbox/loading
```

:::

## 事件

:::demo 事件

```html
checkbox/event
```

:::

## 多选框组

:::demo 多选框组

```html
checkbox/checkbox-group
```

:::

## 多选框组 事件

:::demo 多选框组 事件

```html
checkbox/checkbox-group-event
```

:::

## 全选框

:::demo 全选框

```html
checkbox/checkbox-all
```

:::

## 事件

:::demo 全选框事件

```html
checkbox/checkbox-all-event
```

:::

## 尺寸

:::demo 尺寸 属性：size，有small、default(默认需要写)、large

```html
checkbox/size
```

:::

## 多选框属性

| 属性名       | 类型                    | 默认值  | 可选值                             | 说明         |
| ------------ | ----------------------- | ------- | ---------------------------------- | ------------ |
| type         | String                  | `无`    | `primary、success、error、warning` | 主题色       |
| label        | String、Number          | 无      |                                    | 右侧文本信息 |
| value        | String、Number、Boolean | 无      |                                    | 多选框值     |
| disabled     | Boolean                 | `false` | `true、false`                      | 是否禁用     |
| loading      | Boolean                 | `false` | `true、false`                      | 实现显示加载 |
| size         | String                  | `无`    | `small、default(不需要写)、large`  | 大小         |
| beforeChange | Function                | `无`    | `Function():Promise<any>`          | 异步处理函数 |

## 多选框双向绑定

| 指令    | 类型                           | 默认值 | 可选值 | 说明     |
| ------- | ------------------------------ | ------ | ------ | -------- |
| v-model | String、Number、Boolean、Array | `无`   |        | 双向绑定 |

## 多选框事件

| 事件名 | 参数                                     | 说明       |
| ------ | ---------------------------------------- | ---------- |
| change | `(value:是否选中true或false,e:事件对象)` | change事件 |

## 多选框组属性

| 属性名 | 类型   | 默认值 | 可选值                            | 说明 |
| ------ | ------ | ------ | --------------------------------- | ---- |
| size   | String | `无`   | `small、default(不需要写)、large` | 大小 |

## 多选框组双向绑定

| 指令    | 类型                           | 默认值 | 可选值 | 说明     |
| ------- | ------------------------------ | ------ | ------ | -------- |
| v-model | String、Number、Boolean、Array | `无`   |        | 双向绑定 |

## 多选框组事件

| 事件名 | 参数                         | 说明       |
| ------ | ---------------------------- | ---------- |
| change | `(value:组中数据改变后的值)` | change事件 |

## 全选框组属性

| 属性名 | 类型   | 默认值 | 可选值                            | 说明 |
| ------ | ------ | ------ | --------------------------------- | ---- |
| size   | String | `无`   | `small、default(不需要写)、large` | 大小 |

## 全选框组双向绑定

| 指令    | 类型                           | 默认值 | 可选值 | 说明     |
| ------- | ------------------------------ | ------ | ------ | -------- |
| v-model | String、Number、Boolean、Array | `无`   |        | 双向绑定 |

## 全选框组事件

| 事件名 | 参数                         | 说明       |
| ------ | ---------------------------- | ---------- |
| change | `(value:组中数据改变后的值)` | change事件 |
