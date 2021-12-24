<template>
  <el-button type="primary" class="mr-5" @click="setWatermark('WaterMark Info')">
    Create
  </el-button>
  <el-button color="error" class="mr-5" @click="clear"> Clear </el-button>
  <el-button color="warning" class="mr-5" @click="setWatermark('WaterMark Info New')">
    Reset
  </el-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useWatermark } from '@/hooks/useWatermark'

export default defineComponent({
  setup() {
    const areaRef = ref(null)
    const { setWatermark, clear } = useWatermark()
    return {
      setWatermark,
      clear,
      areaRef,
    }
  },
})
</script>
