<template>
  <div class="flex justify-between h-full w-full">
    <div class="header-l flex">
      <Collapse v-if="sidebarPosition === 'left'"></Collapse>
    </div>
    <slot name="sidebar"></slot>
    <div class="header-r flex items-center">
      <span class="pr-10 pl-10 cursor-pointer">vue3</span>
      <el-icon class="mr-10 ml-10 cursor-pointer" :size="20" color="#000" @click="openDrawer">
        <setting />
      </el-icon>
    </div>
    <Config :direction="direction"></Config>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import Config from './Config.vue'
import Collapse from './components/Collapse.vue'

export default defineComponent({
  components: {
    Config,
    Collapse,
  },
  setup() {
    const direction = ref('rtl')
    const store = useStore()
    const sidebarPosition = computed(() => {
      return store.state.sidebarPosition
    })
    const openDrawer = () => {
      store.dispatch('changeDrawerShow', true)
    }
    return {
      direction,
      sidebarPosition,
      openDrawer,
    }
  },
})
</script>

<style lang="scss" scoped>
.header-l {
  width: 200px;
}
.header-r {
  width: 100px;
}
</style>
