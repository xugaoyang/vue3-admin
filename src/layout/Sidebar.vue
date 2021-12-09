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

<script>
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
          name: 'AllComponents',
          id: '1',
          icon: 'el-icon-house',
          path: '/elementComponents',
          children: [],
        },
        {
          name: 'Components',
          id: '2',
          icon: 'el-icon-apple',
          path: '/tool',
          children: [
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
          ],
        },
        {
          name: '导航三',
          id: '3',
          icon: 'el-icon-food',
          path: '/food',
          children: [
            {
              name: '导航三-1',
              id: '3-1',
              icon: 'el-icon-cherry',
              path: '/food/fries',
              children: [],
            },
            {
              name: '导航三-2',
              id: '3-2',
              icon: 'el-icon-coffee',
              path: '/food/coffee',
              children: [],
            },
          ],
        },
        {
          name: '导航四',
          id: '4',
          icon: 'el-icon-coin',
          path: '/tool',
          children: [],
        },
      ],
    })
    let store = useStore()
    const isMenuCollapse = computed(() => store.state.isMenuCollapse)
    const getSidebarPosition = computed(() => store.state.sidebarPosition)
    const getHeaderBgColor = computed(() => store.state.headerBgColor)
    if (getSidebarPosition.value === 'top') {
      menuMode = 'horizontal'
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
