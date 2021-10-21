<template>
  <el-container class="layout h-full w-full">
    <Sidebar />
    <el-container>
      <el-header class="p-0">
        <Header />
      </el-header>
      <el-main>
        <Tags />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Tags from './Tags.vue'

export default defineComponent({
  components: { Sidebar, Header, Tags },
  setup() {
    
  },
})
</script>

<style lang="scss" scoped>
.layout {
  /deep/ .el-menu{
    border: none;
  } 
}

</style>