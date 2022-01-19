<template>
  <div>
    <el-date-picker v-model="value" type="date" placeholder="Pick a day"> </el-date-picker>
    {{ $t('home') }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      value: '',
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss" scoped></style>
