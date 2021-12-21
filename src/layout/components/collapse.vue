<template>
  <div class="p-5 flex items-center">
    <el-icon
      class="cursor-pointer text-18px"
      v-if="isMenuCollapse"
      @click="changeCollapseStatus(false)"
    >
      <expand />
    </el-icon>
    <el-icon class="cursor-pointer text-18px" v-else @click="changeCollapseStatus(true)">
      <fold />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { Expand, Fold } from '@element-plus/icons'

export default defineComponent({
  components: {
    Expand,
    Fold,
  },
  setup() {
    let store = useStore()
    const isMenuCollapse = computed(() => {
      return store.state.isMenuCollapse
    })
    const changeCollapseStatus = (val: boolean) => {
      store.dispatch('changeMenuCollapse', val)
    }
    return {
      changeCollapseStatus,
      isMenuCollapse,
    }
  },
})
</script>

<style lang="scss" scoped></style>
