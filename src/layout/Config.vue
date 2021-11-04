<template>
  <el-drawer
    size="300px"
    :model-value="getDrawerShow"
    title="项目配置"
    :direction="direction"
    :before-close="closeDrawer"
  >
    <el-divider>主题</el-divider>
    <el-switch
      v-model="theme"
      active-icon-class="el-icon-sunny"
      inactive-icon-class="el-icon-moon"
      active-color="#ffcf00"
      inactive-color="#000"
      active-text="white"
      inactive-text="black"
    />
    <el-divider>导航模式</el-divider>
    <div class="nav-types flex justify-around">
      <el-tooltip class="item" effect="dark" content="左侧菜单模式" placement="bottom">
        <div
          class="nav-type left-right-type flex"
          @click="changeSidebarPosition('left')"
          :class="{ 'border-purple-2px': sidebarPosition === 'left' }"
        >
          <div class="left"></div>
          <div class="right">
            <div class="top"></div>
            <div class="main"></div>
          </div>
        </div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="顶部菜单模式" placement="bottom">
        <div
          class="nav-type top-bottom-type"
          @click="changeSidebarPosition('top')"
          :class="{ 'border-purple-2px': sidebarPosition === 'top' }"
        >
          <div class="top"></div>
          <div class="bottom flex">
            <div class="left"></div>
            <div class="main"></div>
          </div>
        </div>
      </el-tooltip>
    </div>
    <el-divider>系统主题</el-divider>
    <div class="flex justify-between">
      <div
        class="color-item"
        v-for="(item, index) in systemColorList"
        :key="index"
        :class="{ active: item === systemColor }"
        :style="{ backgroundColor: item }"
        @click="activeChangeColor('system', item)"
      ></div>
      <el-color-picker
        size="small"
        v-model="systemColor"
        @active-change="activeChangeColor('system', $event)"
      />
    </div>
    <el-divider>顶栏主题</el-divider>
    <div class="flex justify-between">
      <div
        class="color-item"
        v-for="(item, index) in headerColorList"
        :key="index"
        :class="{ active: item === headerColor }"
        :style="{ backgroundColor: item }"
        @click="activeChangeColor('header', item)"
      ></div>
      <el-color-picker v-model="headerColor" @active-change="activeChangeColor('header', $event)" />
    </div>
    <el-divider>侧边栏主题</el-divider>
    <div class="flex justify-between">
      <div
        class="color-item"
        v-for="(item, index) in sidebarColorList"
        :key="index"
        :class="{ active: item === sidebarColor }"
        :style="{ backgroundColor: item }"
        @click="activeChangeColor('sidebar', item)"
      ></div>
      <el-color-picker
        v-model="sidebarColor"
        @active-change="activeChangeColor('sidebar', $event)"
      />
    </div>
    <el-divider>界面功能</el-divider>
    <div class="flex justify-between">
      <span>面包屑</span>
      <el-switch />
    </div>
    <el-divider></el-divider>
    <el-button icon="el-icon-refresh" class="w-full">重置</el-button>
  </el-drawer>
</template>

<script>
import { defineComponent, ref, computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Sunny, Moon } from '@element-plus/icons'

export default defineComponent({
  props: {
    direction: String
  },
  data() {
    return {
      active: Sunny,
      inactive: Moon
    }
  },
  setup() {
    const store = useStore()
    const theme = ref(true)
    const getDrawerShow = computed({
      get: () => store.state.isDrawerShow,
      set: (val) => store.dispatch('changeDrawerShow', val)
    })
    const systemColor = computed({
      get: () => store.state.systemColor,
      set: (val) => store.dispatch('changeSystemColor', val)
    })
    const headerColor = computed({
      get: () => store.state.headerColor,
      set: (val) => store.dispatch('changeHeaderColor', val)
    })
    const sidebarColor = computed({
      get: () => store.state.sidebarColor,
      set: (val) => store.dispatch('changeSidebarColor', val)
    })
    const customConfig = reactive({
      theme: '',
      systemColorList: [
        '#0960BD',
        '#0084F4',
        '#009688',
        '#536DF3',
        '#FF5C93',
        '#EE4F12',
        '#0096C7',
        '#9C27B0',
        '#FF9800'
      ],
      headerColorList: [
        '#0960BD',
        '#009688',
        '#5172DC',
        '#409EFF',
        '#E74C3C',
        '#24292E',
        '#394664',
        '#001529',
        '#383F45'
      ],
      sidebarColorList: [
        '#0960BD',
        '#212121',
        '#273352',
        '#191B24',
        '#191A23',
        '#304156',
        '#28333E',
        '#344058',
        '#383F45'
      ]
    })
    const closeDrawer = () => {
      store.dispatch('changeDrawerShow', false)
    }
    const sidebarPosition = computed(() => {
      return store.state.sidebarPosition
    })
    const activeChangeColor = (type, value) => {
      const actions = [
        {
          action: 'changeSidebarColor',
          type: 'sidebar'
        },
        {
          action: 'changeSystemColor',
          type: 'system'
        },
        {
          action: 'changeHeaderColor',
          type: 'header'
        }
      ]
      const currentAction = actions.find((action) => action.type === type)
      store.dispatch(currentAction.action, value)
      switch (type) {
        case 'system':
          document.querySelector(':root').setAttribute('style', `--systemColor:${value}`)
          break
        case 'sidebar':
          document.querySelector(':root').setAttribute('style', `--sidebarColor:${value}`)
          break
        case 'header':
          document.querySelector(':root').setAttribute('style', `--headerColor:${value}`)
          break
        default:
          console.log('no change')
      }
    }
    const changeSidebarPosition = (position) => {
      store.dispatch('changeSidebarPosition', position)
    }
    return {
      theme,
      getDrawerShow,
      systemColor,
      headerColor,
      sidebarColor,
      ...toRefs(customConfig),
      sidebarPosition,
      closeDrawer,
      changeSidebarPosition,
      activeChangeColor
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/theme/theme.scss';
.nav-type {
  position: relative;
  width: 56px;
  height: 48px;
  margin-right: 16px;
  overflow: hidden;
  cursor: pointer;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
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
      height: 32px;
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
    height: 32px;
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
.color-item {
  width: 24px;
  height: 24px;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  &.active {
    border-color: $systemColor;

    &::before {
      content: '\2713';
      font-size: 14px;
      color: #fff;
      position: absolute;
      top: 1px;
      left: 7px;
    }
  }
}
::v-deep .el-icon-moon,
::v-deep .el-icon-sunny {
  font-size: 16px;
}
::v-deep .el-color-picker__trigger {
  padding: 0px;
  width: 24px!important;
  height: 24px!important;
  border: none!important;
}
</style>
