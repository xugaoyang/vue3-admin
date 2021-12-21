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
      @change="themeChange"
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
        v-for="(item, index) in headerBgColorList"
        :key="index"
        :class="{ active: item === headerBgColor }"
        :style="{ backgroundColor: item }"
        @click="activeChangeColor('header', item)"
      ></div>
      <el-color-picker
        v-model="headerBgColor"
        @active-change="activeChangeColor('header', $event)"
      />
    </div>
    <el-divider>侧边栏主题</el-divider>
    <div class="flex justify-between">
      <div
        class="color-item"
        v-for="(item, index) in sidebarBgColorList"
        :key="index"
        :class="{ active: item === sidebarBgColor }"
        :style="{ backgroundColor: item }"
        @click="activeChangeColor('sidebar', item)"
      ></div>
      <el-color-picker
        v-model="sidebarBgColor"
        @active-change="activeChangeColor('sidebar', $event)"
      />
    </div>
    <el-divider>界面功能</el-divider>
    <div class="flex justify-between">
      <span>面包屑</span>
      <el-switch />
    </div>
    <el-divider></el-divider>
    <el-button type="primary" icon="el-icon-refresh" class="w-full">重置</el-button>
  </el-drawer>
</template>

<script>
import { defineComponent, ref, computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Sunny, Moon } from '@element-plus/icons'
import { hexToRgb, colorGrayLevel } from '../utils/colorTransform'
import { uniqStringByReg, initDarkTheme, initLightTheme } from '../utils/common'

export default defineComponent({
  props: {
    direction: String,
  },
  data() {
    return {
      active: Sunny,
      inactive: Moon,
    }
  },
  setup() {
    const store = useStore()
    const theme = ref(true)
    const getDrawerShow = computed({
      get: () => store.state.isDrawerShow,
      set: (val) => store.dispatch('changeDrawerShow', val),
    })
    const currentTheme = computed(() => store.state.theme)
    if (currentTheme.value === 'dark') {
      theme.value = false
      initDarkTheme()
    } else {
      theme.value = true
      initLightTheme()
    }
    const systemColor = computed({
      get: () => store.state.systemColor,
      set: (val) => store.dispatch('changeSystemColor', val),
    })
    const headerBgColor = computed({
      get: () => store.state.headerBgColor,
      set: (val) => store.dispatch('changeHeaderBgColor', val),
    })
    const sidebarBgColor = computed({
      get: () => store.state.sidebarBgColor,
      set: (val) => store.dispatch('changeSidebarBgColor', val),
    })
    const customConfig = reactive({
      systemColorList: [
        '#0960BD',
        '#0084F4',
        '#009688',
        '#536DF3',
        '#FF5C93',
        '#EE4F12',
        '#0096C7',
        '#9C27B0',
        '#FF9800',
      ],
      headerBgColorList: [
        '#0960BD',
        '#009688',
        '#5172DC',
        '#409EFF',
        '#E74C3C',
        '#24292E',
        '#394664',
        '#001529',
        '#383F45',
      ],
      sidebarBgColorList: [
        '#0960BD',
        '#212121',
        '#273352',
        '#191B24',
        '#191A23',
        '#304156',
        '#28333E',
        '#344058',
        '#383F45',
      ],
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
          action: 'changeSidebarBgColor',
          type: 'sidebar',
        },
        {
          action: 'changeSystemColor',
          type: 'system',
        },
        {
          action: 'changeHeaderBgColor',
          type: 'header',
        },
      ]

      const currentAction = actions.find((action) => action.type === type)
      store.dispatch(currentAction.action, value)

      // 获取根元素的属性
      let rootStyle = document.querySelector(':root').getAttribute('style')
      rootStyle = rootStyle === null ? '' : rootStyle

      // 获取当前配置色的灰度，判断深色还是浅色
      const isDeepColor = colorGrayLevel(hexToRgb(String(value)), 100) === 'deep'

      // 优先判断style是否有重复属性
      switch (type) {
        case 'system':
          rootStyle = uniqStringByReg(rootStyle, '--systemColor')
          rootStyle += `--systemColor:${value};`
          break
        case 'sidebar':
          rootStyle = uniqStringByReg(rootStyle, '--sidebarBgColor')
          rootStyle += `--sidebarBgColor:${value};`
          rootStyle = uniqStringByReg(rootStyle, '--sidebarTextColor')
          if (isDeepColor) {
            rootStyle += `--sidebarTextColor:#fff;`
          } else {
            rootStyle += `--sidebarTextColor:#000;`
          }
          break
        case 'header':
          rootStyle = uniqStringByReg(rootStyle, '--headerBgColor')
          rootStyle += `--headerBgColor:${value};`
          rootStyle = uniqStringByReg(rootStyle, '--headerTextColor')
          if (isDeepColor) {
            rootStyle += `--headerTextColor:#fff;`
          } else {
            rootStyle += `--headerTextColor:#000;`
          }
          break
        default:
          console.log('no change')
      }
      document.querySelector(':root').setAttribute('style', rootStyle)
    }
    const changeSidebarPosition = (position) => {
      store.dispatch('changeSidebarPosition', position)
      if (currentTheme.value === 'dark') {
        theme.value = false
        initDarkTheme()
      }
    }
    const themeChange = (val) => {
      let themeClass = document.querySelector('html').getAttribute('class') || ''
      // const hasDarkClass = themeClass.includes('dark-theme')
      if (val) {
        // 移除 class:dark-theme
        themeClass = ''
        store.dispatch('changeTheme', 'light')
        initLightTheme()
      } else {
        // 添加 class:dark
        themeClass = 'dark'
        store.dispatch('changeTheme', 'dark')
        store.dispatch('changeSidebarBgColor', '#000')
        store.dispatch('changeHeaderBgColor', '#000')
        // 切换暗模式，强制重置头部和侧边背景色以及文字颜色
        initDarkTheme()
      }
      document.querySelector('html').setAttribute('class', themeClass)
    }
    return {
      theme,
      getDrawerShow,
      systemColor,
      headerBgColor,
      sidebarBgColor,
      ...toRefs(customConfig),
      sidebarPosition,
      closeDrawer,
      changeSidebarPosition,
      activeChangeColor,
      themeChange,
    }
  },
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
:deep .el-icon-moon,
:deep .el-icon-sunny {
  font-size: 16px;
}
:deep .el-color-picker__trigger {
  padding: 0px;
  width: 24px !important;
  height: 24px !important;
  border: none !important;
}
:deep .el-divider__text {
  color: #000;
}
:deep .el-switch__label {
  color: #000;
}
</style>
