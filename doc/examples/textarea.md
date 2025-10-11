# textarea组件

## inputType属性

:::demo 主题颜色 默认primary、可选:success、warning、error

```html
textarea/index
```

:::

## placeholder属性

:::demo 自定义提示符，默认为:请输入

```html
textarea/placeholder
```

:::

## rows属性

:::demo 设置行数，默认为4

```html
textarea/rows
```

:::

## maxlength属性

:::demo 设置最大字符数

```html
textarea/maxlength
```

:::

## count属性

:::demo 字符统计，前提是必须设置maxlength

```html
textarea/count
```

:::

## clear属性

:::demo 清除按钮

```html
textarea/clear
```

:::

## disabled属性

:::demo 禁用

```html
textarea/disabled
```

:::

## width属性

:::demo 指定宽度，未指定时占满父容器

```html
textarea/width
```

:::

## 前缀prefix和后缀suffix插槽

:::demo 给文本框上下内容添加信息

```html
textarea/prefix-suffix
```

:::

## 事件

:::demo 文本框事件

```html
textarea/event
```

:::

## 暴露的属性

:::demo 文本框暴露的属性

```html
textarea/expose
```

:::

## size属性

:::demo 文本框内部文字大小，默认为default(不需要写)、可选为：small、large

```html
textarea/size
```

:::

## textarea文本框属性

| 属性名      | 类型           | 默认值    | 可选值                             | 说明             |
| ----------- | -------------- | --------- | ---------------------------------- | ---------------- |
| inputType   | String         | `primary` | `primary、success、error、warning` | 主题色           |
| rows        | String、Number | `4`       | `无`                               | 行数             |
| maxlength   | String、Number | `false`   | `无`                               | 最大字符数量     |
| count       | Boolean        | `false`   | `true、false`                      | 是否显示字符统计 |
| clear       | Boolean        | `false`   | `true、false`                      | 是否展示清除按钮 |
| disabled    | Boolean        | `false`   | `true、false`                      | 是否禁用         |
| width       | String、Number | `false`   | `无`                               | 宽度             |
| placeholder | String         | `请输入`  | `无`                               | 提示符           |
| size        | String         | `无`      | `small、default(无效写)、large`    | 内部的文字大小   |

## textarea文本框插槽

| 插槽名      | 说明                                       |
| ----------- | ------------------------------------------ |
| prefix      | 文本框上行内容                             |
| suffixLeft  | 文本框下行相对于count和clear属性的左边内容 |
| suffixRight | 文本框下行相对于count和clear属性的右边内容 |

## textarea文本框事件

| 事件名     | 参数           | 说明              |
| ---------- | -------------- | ----------------- |
| input      | `(e:事件对象)` | 输入事件          |
| change     | `()`           | 内容改变+光标消失 |
| focus      | `(e:事件对象)` | 获取焦点事件      |
| blur       | `()`           | 失去焦点事件      |
| mouseenter | `(e:事件对象)` | 鼠标进入事件      |
| mouseleave | `(e:事件对象)` | 事鼠标离开事件    |
| keyup      | `(e:事件对象)` | 键盘抬起事件      |
| keydown    | `(e:事件对象)` | 键盘按下事件      |

## textarea文本框暴露的属性

| 属性名 | 说明          |
| ------ | ------------- |
| ref    | 内部input实例 |
| focus  | 获取焦点      |
| blur   | 失去焦点      |
| select | 文本全选      |
