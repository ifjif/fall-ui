/*
 *
const data = [
  { name: '', type: '', default: '', value: '',desc:'' },
]

const slotData = [
  { name: '', param:'', desc:'' },
]

const eventData = [
  { name: '', params: '', desc: '' }
]

const exposeData = [
  { name: '', type: '',params:'', desc: '' },
]
 *
 */
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
  {
    prop: 'desc',
    label: '说明',
    width: '100px'
  },
]
const slotColumns = [
  {
    prop: 'name',
    label: '插槽名',
    width: '100px'
  },
  {
    prop: 'param',
    label: '参数',
    width: '100px',
  },
  {
    prop: 'desc',
    label: '说明',
    width: '100px',
  }
]


const eventColumns = [
  {
    prop: 'name',
    label: '事件名',
    width: '100px',
  },
  {
    prop: 'params',
    label: '参数',
    width: '100px',
  },
  {
    prop: 'desc',
    label: '说明',
    width: '100px',
  }
]
const exposeColumns = [
  {
    prop: 'name',
    label: '暴露名',
    width: '100px',
  },
  {
    prop: 'type',
    label: '类型',
    width: '100px',
  },
  {
    prop: 'params',
    label: '参数',
    width: '100px',
  },
  {
    prop: 'desc',
    label: '说明',
    width: '100px',
  }
]

export {
  columns,
  slotColumns,
  eventColumns,
  exposeColumns
}
