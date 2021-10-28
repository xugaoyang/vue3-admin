<template>
  <el-drawer
    size="300px"
    :model-value="drawer"
    title="项目配置"
    :direction="direction"
    :before-close="close"
  >
    <el-divider>主题</el-divider>
    <el-switch v-model="theme"
      active-color="lightgreen"
      inactive-color="#000"
      active-text="white"
      inactive-text="black" />
    <el-divider>导航模式</el-divider>
    <div class="nav-types flex justify-around">
      <el-tooltip class="item" effect="dark" content="左侧菜单模式" placement="bottom">
        <div class="nav-type left-right-type flex" @click="changeSidebarPosition('left')" :class="{'border-purple-2px': sidebarPosition==='left'}">
          <div class="left"></div>
          <div class="right">
            <div class="top"></div>
            <div class="main"></div>
          </div>
        </div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="顶部菜单模式" placement="bottom">
        <div class="nav-type top-bottom-type" @click="changeSidebarPosition('top')" :class="{'border-purple-2px': sidebarPosition==='top'}">
          <div class="top"></div>
          <div class="bottom flex">
            <div class="left"></div>
            <div class="main"></div>
          </div>
          
        </div>
      </el-tooltip>
    </div>
    <el-divider>系统主题</el-divider>
    <el-color-picker v-model="systemTheme" show-alpha @change="changeTheme" />
    <el-divider>顶栏主题</el-divider>
    <el-color-picker v-model="headerTheme" show-alpha />
    <el-divider>菜单主题</el-divider>
    <el-color-picker v-model="menuTheme" show-alpha />
    <el-divider>界面功能</el-divider>
  </el-drawer>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Sunny, Moon } from '@element-plus/icons'

export default defineComponent({
  props: {
    drawer: Boolean,
    direction: String 
  },
  data() {
    return {
      active: Sunny,
      inactive: Moon
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const theme = ref(true)
    const navMode = ref('')
    const systemTheme = ref('')
    const headerTheme = ref('')
    const menuTheme = ref('')
    const customConfig = ref({})
    const close = () => {
      emit('update:drawer', false)
    }
    const sidebarPosition = computed(() => {
      return store.state.sidebarPosition
    })
    const changeTheme = () => {
      console.log(systemTheme.value)
    }
    const changeSidebarPosition = (position) => {
      store.dispatch('changeSidebarPosition', position)
    }
    return {
      theme,
      navMode,
      systemTheme,
      headerTheme,
      menuTheme,
      customConfig,
      sidebarPosition,
      close,
      changeTheme,
      changeSidebarPosition
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-type {
  position: relative;
  width: 56px;
  height: 48px;
  margin-right: 16px;
  overflow: hidden;
  cursor: pointer;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgba(0,0,0,.18);
  border: 2px solid transparent;
  &:hover {
    border: 2px solid #9c27b0;
  }
}
.border-purple-2px {
  border: 2px solid #9c27b0;
}

.left-right-type {
  .left {
    width: 33%;
    background: #000;
  }
  .right {
    width: 67%;
    .top {
      height: 16px;
      background: #fff;
    }
    .main {
      height:32px;
      background: #ccc;
    }
  }
  
}
.top-bottom-type {
  .top {
    height: 16px;
    background: #000;
    
  }
  .bottom {
    height:32px;
    .left {
      width: 33%;
      background: #fff;
    }
    .main {
      width: 67%;
      background: #ccc;
    }
  }
}
</style>