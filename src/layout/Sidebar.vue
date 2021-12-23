<template>
  <div>
    <el-menu
      class="h-full side-menu no-transition"
      router
      :collapse="isMenuCollapse"
      :mode="menuMode"
    >
      <sidebar-item v-for="item in menuList" :key="item.id" :item="item"></sidebar-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRefs, reactive } from 'vue'
import { useStore } from 'vuex'
import SidebarItem from './components/SidebarItem.vue'

export default defineComponent({
  components: {
    SidebarItem,
  },
  setup() {
    let menuMode = ref('vertical')
    const data = reactive({
      menuList: [
        {
          name: 'Workbench',
          id: '1',
          icon: 'el-icon-house',
          path: '/Workbench',
          children: [],
        },
        {
          name: 'ElementPlus',
          id: '2',
          icon: 'el-icon-apple',
          path: '/tool',
          children: [
            {
              name: 'AllComponents',
              id: '1',
              icon: 'el-icon-house',
              path: '/elementComponents',
              children: [],
            },
            {
              name: 'info',
              id: '2-1',
              icon: 'el-icon-baseball',
              path: '/info',
              children: [],
            },
            {
              name: 'table',
              id: '2-2',
              icon: 'el-icon-basketball',
              path: '/table',
              children: [],
            },
            {
              name: 'i18n',
              id: '2-3',
              icon: 'el-icon-cherry',
              path: '/i18n',
              children: [],
            },
          ],
        },
        {
          name: 'charts',
          id: '3',
          icon: 'el-icon-food',
          path: '/food',
          children: [
            {
              name: 'echart',
              id: '3-1',
              icon: 'el-icon-cherry',
              path: '/echarts',
              children: [],
            },
            {
              name: 'baiduMap',
              id: '3-2',
              icon: 'el-icon-coffee',
              path: '/baiduMap',
              children: [],
            },
            {
              name: 'baiduMapGl',
              id: '3-2',
              icon: 'el-icon-coffee',
              path: '/baiduMapGl',
              children: [],
            },
          ],
        },
        {
          name: 'Components',
          id: '4',
          icon: 'el-icon-coin',
          path: '/tool',
          children: [
            {
              name: 'Markdown',
              id: '4-1',
              icon: 'el-icon-cherry',
              path: '/markdown',
              children: [],
            },
            {
              name: 'Editor',
              id: '4-2',
              icon: 'el-icon-cherry',
              path: '/editor',
              children: [],
            },
          ],
        },
        {
          name: 'Functions',
          id: '5',
          icon: 'el-icon-coin',
          path: '/tool',
          children: [
            {
              name: 'WaterMark',
              id: '4-1',
              icon: 'el-icon-cherry',
              path: '/watermark',
              children: [],
            },
          ],
        },
      ],
    })
    let store = useStore()
    const isMenuCollapse = computed(() => store.state.isMenuCollapse)
    const getSidebarPosition = computed(() => store.state.sidebarPosition)
    const getHeaderBgColor = computed(() => store.state.headerBgColor)
    if (getSidebarPosition.value === 'top') {
      menuMode.value = 'horizontal'
      store.dispatch('changeSidebarBgColor', getHeaderBgColor.value)
    }
    const params = toRefs(data)
    return {
      ...params,
      menuMode,
      isMenuCollapse,
    }
  },
})
</script>

<style lang="scss" scoped>
.side-menu {
  width: 100%;
}
// .side-menu:not(.el-menu--collapse) {
//   width: 200px;
// }
.no-transition {
  transition: none;
}
</style>
