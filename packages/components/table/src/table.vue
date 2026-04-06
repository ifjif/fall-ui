<template>
  <div :class="[ns.b()]">
    <FlScrollBar>
      <table :class="[ns.m('inner')]">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.prop" :style="{
              width: col.width,
              textAlign: col.align || 'left'
            }">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td v-for="col in columns" :key="col.prop" :style="{
              width: col.width,
              textAlign: col.align || 'left'
            }">
              <!--如果有对应插槽，则使用插槽；否则显示 row[prop] -->
              <slot v-if="$slots[col.prop]" :name="col.prop" :row="row" :$index="index" />
              <template v-else>
                {{ row[col.prop] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </FlScrollBar>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('table')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { FlScrollBar } from '../../scroll-bar';
const ns = useNamespace('table')

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  columns: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style scoped>
.fl-table {
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
}

.fl-table--inner {
  /*width: fit-content;*/
  min-width: 100%;
  width: max-content;
  border-collapse: collapse;
  font-size: 14px;
  color: #606266;
  table-layout: fixed;
}

.fl-table--inner th,
.fl-table--inner td {
  padding: 12px 8px;
  border-bottom: 1px solid #ebeef5;
}

.fl-table--inner th {
  background-color: #f5f7fa;
  font-weight: bold;
  text-align: left;
}

.fl-table--inner tr:hover {
  background-color: #f5f7fa;
}
</style>
