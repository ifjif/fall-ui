# button组件

## type属性

:::demo 默认，有四种主题样式：primary、success、warning、error

```html
button/index
```

:::

## round属性

:::demo 圆角框 属性：round

```html
button/round
```

:::

## disabled属性

:::demo 禁用 属性：disabled

```html
button/disabled
```

:::

## circle属性

:::demo 圆形 属性：circle

```html
button/circle
```

:::

## text属性

:::demo 文本 属性: text

```html
button/text
```

:::

## link属性

:::demo 链接 属性：link

```html
button/link
```

:::

## border属性

:::demo 边框 属性: border(线) 或 dashed(点)

```html
button/border
```

:::

## 加载状态

:::demo 加载 属性：loading

```html
button/loading
```

:::

## block属性

:::demo 块 属性：block 说明：独占一行

```html
button/block
```

:::

## 带图标

:::demo 带图标，组件库的自带图标使用介绍，请前往图标页面查看

```html
button/with-icon
```

:::

## 尺寸

:::demo 尺寸 属性：size 默认值为：default(不需要设置) 可选设置：small、large

```html
button/size
```

:::

## 按钮组

:::demo 按钮组

```html
button/button-group
```

:::

## 按钮组尺寸

:::demo 按钮组尺寸 属性：size 默认值为：default(不需要设置) 可选设置：small、large

```html
button/button-group-size
```

:::

## 点击事件

:::demo 点击事件

```html
button/event
```

:::

## button按钮属性

| 属性名       | 类型     | 默认值  | 可选值                             | 说明           |
| ------------ | -------- | ------- | ---------------------------------- | -------------- |
| type         | String   | `无`    | `primary、success、error、warning` | 主题色         |
| round        | Boolean  | `false` | `true、false`                      | 是否圆角       |
| circle       | Boolean  | `false` | `true、false`                      | 是否圆形       |
| disabled     | Boolean  | `false` | `true、false`                      | 是否禁用       |
| text         | Boolean  | `false` | `true、false`                      | 是否是文本按钮 |
| link         | Boolean  | `false` | `true、false`                      | 是否是链接按钮 |
| dashed       | Boolean  | `false` | `true、false`                      | 是否点边框按钮 |
| loading      | Boolean  | `false` | `true、false`                      | 实现显示加载   |
| border       | Boolean  | `false` | `true、false`                      | 是否线边框按钮 |
| block        | Boolean  | `false` | `true、false`                      | 是否块元素     |
| size         | String   | `无`    | `small、default(不需要写)、large`  | 大小           |
| beforeChange | Function | `无`    | `Function():Promise<any>`          | 异步处理函数   |

## button按钮事件

| 事件名 | 参数           | 说明         |
| ------ | -------------- | ------------ |
| click  | `(e:事件对象)` | 点击按钮事件 |

## button-group按钮属性

| 属性名 | 类型   | 默认值 | 可选值                            | 说明       |
| ------ | ------ | ------ | --------------------------------- | ---------- |
| size   | String | `无`   | `small、default(不需要写)、large` | 按钮组尺寸 |
