<template>
  <div :class="[ns.b()]">
    <div :class="ns.e('label')">
      <Checkbox :size="size" @change="selectAllEvent" v-model="all" label="全选" :indeterminate="indeterminate">
      </Checkbox>
    </div>
    <div :class="[ns.e('wrapper')]">
      <CheckboxGroup :size="size" @change="changeEvent" v-model="allModel">
        <slot />
      </CheckboxGroup>
    </div>
  </div>
</template>
<script>
import { useNamespace } from '@ui-library/hooks'
import { provide } from 'vue'
import { ref } from 'vue'
const ns = useNamespace('checkbox-all')


export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@ui-library/hooks'
import Checkbox from '../src/checkbox.vue'
import CheckboxGroup from '../checkbox-group/checkbox-group.vue'
import { CHECKBOX_ALL_KEY } from '../contants'
const ns = useNamespace('checkbox-all')

const props = defineProps({
  size: String
})

const emit = defineEmits(['change'])

const allModel = defineModel({ type: Array, default: () => [] })
const list = ref([])
const all = ref(false)
const indeterminate = ref(false)
const setValue4All = (value) => {
  list.value.push(value);

}
const changeEvent = (value) => {
  if (value.length === 0) {
    indeterminate.value = false
    all.value = false
  } else if (list.value.length === value.length) {
    indeterminate.value = false
    all.value = true
  } else {
    indeterminate.value = true
  }

  emit('change', value)
}

const selectAllEvent = (checked) => {
  if (indeterminate.value || checked) {
    allModel.value = list.value
    indeterminate.value = false
    all.value = true
  } else if (!checked) {
    allModel.value = []
  }
  emit('change', allModel.value)
}

provide(CHECKBOX_ALL_KEY, { setValue4All })

</script>
