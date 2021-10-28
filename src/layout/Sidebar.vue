<template>

  <!-- <el-aside> -->
    <el-menu class="h-full side-menu" router :collapse="isMenuCollapse" :mode="menuMode">
      <el-sub-menu index="1">
        <template #title
          ><i class="el-icon-message"></i>
          <span>导航一</span></template
        >
        <el-menu-item-group>
          <el-menu-item index="/table">table</el-menu-item>
          <el-menu-item index="/helloworld">helloworld</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>导航二</span>
        </template>
        <el-menu-item-group>
          <template #title>Group 1</template>
          <el-menu-item index="2-1">Option 1</el-menu-item>
          <el-menu-item index="2-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="2-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="2-4">
          <template #title>Option 4</template>
          <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <i class="el-icon-setting"></i>
          <span>导航三</span>
        </template>
        <el-menu-item-group>
          <template #title>Group 1</template>
          <el-menu-item index="3-1">Option 1</el-menu-item>
          <el-menu-item index="3-2">Option 2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group 2">
          <el-menu-item index="3-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="3-4">
          <template #title>Option 4</template>
          <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  <!-- </el-aside> -->
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    let menuMode = ref('vertical')
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
    return {
      menuMode,
      isMenuCollapse
    }
  },
})
</script>

<style lang="scss" scoped>
// .side-menu:not(.el-menu--collapse) {
//   width: 200px;
// }
</style>