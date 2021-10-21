<template>
  <div class="flex justify-between h-full w-full">
    <div class="header-l"></div>
    <div class="header-r flex items-center">
      <span class="pr-10 pl-10 cursor-pointer">vue3</span>
      <el-icon class="mr-10 ml-10 cursor-pointer" :size="20" color="#000" @click="drawer = true">
        <setting />
      </el-icon>
    </div>
    <Config @update:drawer="drawer" :direction="direction"></Config>
  </div>
  
</template>

<script>
import { defineComponent, ref } from 'vue'
import Config from './Config.vue'

export default defineComponent({
  components: {
    Config
  },
  setup() {
    const drawer = ref(false)
    const direction = ref('rtl')
    return {
      drawer,
      direction
    }
  },
})
</script>

<style lang="scss" scoped>
.header-l {
  width: 400px;
}
</style>