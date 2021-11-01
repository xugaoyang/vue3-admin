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
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    item: Object,
    collapse: Boolean
  },
  setup() {
    const handleMenu = () => {}
    return {
      handleMenu
    }
  }
})
</script>

<style></style>