<template>
  <el-menu class="h-full side-menu no-transition" router :collapse="isMenuCollapse" :mode="menuMode">
    <sidebar-item
      v-for="item in menuList"
      :key="item.id"
      :item="item"
    ></sidebar-item>
  </el-menu>
</template>

<script>
import { defineComponent, ref, computed, toRefs, reactive } from 'vue'
import { useStore } from 'vuex'
import SidebarItem from './components/SidebarItem.vue'

export default defineComponent({
  components: {
    SidebarItem
  },
  setup() {
    let menuMode = ref('vertical')
    const data = reactive({
      menuList: [
        {
          name: '首页',
          id: '1',
          icon: 'el-icon-house',
          path: '/home',
          children: []
        },
        {
          name: '导航一',
          id: '2',
          icon: 'el-icon-apple',
          path: '/tool',
          children: [
            {
              name: '导航一-1',
              id: '2-1',
              icon: 'el-icon-baseball',
              path: '/tool/page1',
              children: []
            },
            {
              name: '导航一-2',
              id: '2-2',
              icon: 'el-icon-basketball',
              path: '/tool/page2',
              children: []
            }
          ]
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
              children: []
            },
            {
              name: '导航三-2',
              id: '3-2',
              icon: 'el-icon-coffee',
              path: '/food/coffee',
              children: []
            }
          ]
        },
        {
          name: '导航四',
          id: '4',
          icon: 'el-icon-coin',
          path: '/tool',
          children: []
        }
      ]
    })
    let store = useStore()
    const isMenuCollapse = computed(() => {
      return store.state.isMenuCollapse
    })
    const sidebarPosition = computed(() => {
      return store.state.sidebarPosition
    })
    console.warn(sidebarPosition.value, menuMode.value)
    if (sidebarPosition.value === 'top') {
      menuMode = 'horizontal'
    }
    const params = toRefs(data)
    return {
      ...params,
      menuMode,
      isMenuCollapse
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