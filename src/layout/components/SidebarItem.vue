<template>
  <el-sub-menu :index="item.path" v-if="item.children.length > 0">
    <template #title>
      <i v-if="item.icon" :class="item.icon"></i>
      <span>{{ item.name }}</span>
    </template>
    <sidebar-item v-for="child in item.children" :key="child.id" :item="child"></sidebar-item>
  </el-sub-menu>
  <el-menu-item :index="item.path" v-else @click="handleMenu(item)">
    <i v-if="item.icon" :class="item.icon"></i>
    <span>{{ item.name }}</span>
  </el-menu-item>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    item: Object,
    collapse: Boolean
  },
  setup() {
    const store = useStore()
    const sidebarPosition = computed(() => {
      return store.state.sidebarPosition
    })
    const isMenuCollapse = computed(() => {
      return store.state.isMenuCollapse
    })
    const handleMenu = () => {
      // const { menuId, menuName } = obj
      // let tabs = getTabs()
      // let flag = true
      // tabs.forEach((item) => {
      //   if (item.id === menuId) {
      //     flag = false
      //   }
      // })
      // if (flag) {
      //   tabs.push({
      //     id: menuId,
      //     name: menuName,
      //     active: true
      //   })
      // }
      // store.commit('getActiveMenu', menuId)
      // setTabs(tabs, menuId)
    }
    return {
      sidebarPosition,
      isMenuCollapse,
      handleMenu
    }
  }
})
</script>

<style></style>