<template>
  <el-drawer
    v-model="drawer"
    title="项目配置"
    :direction="direction"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    drawer: Boolean,
    direction: String 
  },
  setup(props) {
    const drawer = toRefs(props, 'drawer')
    console.log(drawer)
  },
})
</script>

<style lang="scss" scoped>

</style>