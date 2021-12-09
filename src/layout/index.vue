<template>
  <el-container class="layout h-full w-full" v-if="getSidebarPosition === 'left'">
    <el-aside :width="sidebarWidth">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header class="p-0">
        <Header />
      </el-header>
      <el-main class="pr-10 pl-10 pb-10 pt-0">
        <Tags />
        <router-view :style="{ height: contentHeight }" />
      </el-main>
    </el-container>
  </el-container>
  <el-container class="layout h-full w-full" v-else-if="getSidebarPosition === 'top'">
    <el-header class="p-0">
      <Header>
        <template v-slot:sidebar>
          <sidebar mode="horizontal"></sidebar>
        </template>
      </Header>
    </el-header>
    <el-main class="p-10">
      <Tags />
      <router-view :style="{ height: contentHeight }" />
    </el-main>
  </el-container>
  <el-container class="layout h-full w-full" v-else>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Tags from './Tags.vue'
import { uniqStringByReg, initDarkTheme } from '../utils/common'

export default defineComponent({
  components: { Sidebar, Header, Tags },
  setup() {
    const store = useStore()
    const getSidebarPosition = computed(() => {
      return store.state.sidebarPosition
    })
    const sidebarWidth = computed(() => {
      return store.state.isMenuCollapse ? '64px' : '200px'
    })
    const contentHeight = computed(() => {
      return 'calc(100% - 50px)'
    })
    const theme = computed(() => store.state.theme)
    const systemColor = computed(() => store.state.systemColor)
    const headerBgColor = computed(() => store.state.headerBgColor)
    const sidebarBgColor = computed(() => store.state.sidebarBgColor)

    // 初始化
    let rootStyle = document.querySelector(':root').getAttribute('style')
    rootStyle = rootStyle === null ? '' : rootStyle
    rootStyle = uniqStringByReg(rootStyle, '--systemColor')
    rootStyle += `--systemColor:${systemColor.value};`
    rootStyle = uniqStringByReg(rootStyle, '--headerBgColor')
    rootStyle += `--headerBgColor:${headerBgColor.value};`
    rootStyle = uniqStringByReg(rootStyle, '--sidebarBgColor')
    rootStyle += `--sidebarBgColor:${sidebarBgColor.value};`
    document.querySelector(':root').setAttribute('style', rootStyle)

    if (theme.value === 'dark') {
      initDarkTheme()
      document.querySelector('html').setAttribute('class', theme.value)
    }

    return {
      contentHeight,
      getSidebarPosition,
      sidebarWidth,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout {
  ::v-deep .el-menu {
    border: none;
  }
}
[mode='horizontal'] {
  flex: auto;
}
</style>
