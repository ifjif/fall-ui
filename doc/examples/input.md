# input组件

## inputType属性

:::demo inputType属性指定主题，可选值：primary(默认)、success、warning、error

```html
input/index
```

:::

## round属性

:::demo round属性 来设置输入框的 角为圆角

```html
input/round
```

:::

## placeholder属性

:::demo placeholder属性，指定提示词

```html
input/placeholder
```

:::

## width属性

:::demo width属性，设置input宽度

```html
input/width
```

:::

## clear属性

:::demo clear属性，展示清除图标,可清除输入框中的文本

```html
input/clear
```

## showPassword属性

:::demo showPassword属性，使输入框成为密码框(不会显示原始输入内容，而是某个占位符代替内容显示)

```html
input/show-password
```

:::

## maxlength属性

:::demo maxlength属性,限制输入框中的字符数量

```html
input/maxlength
```

:::

## count属性

:::demo count属性，展示输入字符数量，前提条件是必须设置maxlength

```html
input/count
```

:::

## disabled属性

:::demo disabled属性, 输入框禁用

```html
input/disabled
```

:::

## prefix和suffix属性

:::demo 前缀和后缀

```html
input/prefix-suffix
```

:::

## prepend和append属性

:::demo 前置和后置

```html
input/prepend-append
```

:::

## 双向绑定

:::demo 双向绑定

```html
input/v-model
```

:::

## 事件

:::demo 事件

```html
input/event
```

:::

## 暴露的属性

:::demo input组件暴露的属性

```html
input/expose
```

:::

## 尺寸

:::demo size 属性可以设置尺寸 可选值为：small、default(默认，不需要写)、large

```html
input/size
```

:::

## input输入框属性

| 属性名       | 类型           | 默认值    | 可选值                             | 说明             |
| ------------ | -------------- | --------- | ---------------------------------- | ---------------- |
| inputType    | String         | `primary` | `primary、success、error、warning` | 主题色           |
| round        | Boolean        | `false`   | `true、false`                      | 是否圆角         |
| size         | String         | `false`   | `无`                               | 尺寸             |
| maxlength    | String、Number | `false`   | `无`                               | 最大字符数量     |
| count        | Boolean        | `false`   | `true、false`                      | 是否显示字符统计 |
| clear        | Boolean        | `false`   | `true、false`                      | 是否展示清除按钮 |
| showPassword | Boolean        | `false`   | `true、false`                      | 是否是密码框     |
| disabled     | Boolean        | `false`   | `true、false`                      | 是否禁用         |
| prefix       | String         | `false`   | `无`                               | 前缀文本         |
| suffix       | String         | `false`   | `无`                               | 后缀文本         |
| prefixIcon   | String、Object | `false`   | `无`                               | 前缀图标         |
| suffixIcon   | String、Object | `false`   | `无`                               | 后缀图标         |
| prepend      | String         | `false`   | `无`                               | 前置文本         |
| append       | String         | `false`   | `无`                               | 后置文本         |
| width        | String、Number | `false`   | `无`                               | 宽度             |
| placeholder  | String         | `请输入`  | `无`                               | 提示符           |

## input输入框事件

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

## input输入框暴露的属性

| 属性名 | 说明          |
| ------ | ------------- |
| ref    | 内部input实例 |
| focus  | 获取焦点      |
| blur   | 失去焦点      |
| select | 文本全选      |
