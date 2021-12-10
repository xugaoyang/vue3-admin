<template>
  <div id="pageTags" class="pb-10">
    <el-scrollbar class="tag-scroll pt-5 pb-5">
      <el-tooltip v-for="tag in getTags" :content="tag.title" :key="tag.title">
        <el-tag
          class="mr-5 cursor-pointer"
          size="small"
          :type="tag.title === getCurrentTag.title ? '' : 'info'"
          :closable="tag.title !== 'elementComponents'"
          @click="clickTag(tag)"
          @close="closeTag(tag.title)"
          >{{ tag.title }}</el-tag
        >
      </el-tooltip>
    </el-scrollbar>
    <div class="tag-close-menu mr-5 ml-5 text-center">
      <el-dropdown size="mini" trigger="hover" placement="bottom" @command="closeTagCommand">
        <el-icon class="icon-close cursor-pointer">
          <close />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in closeMenu" :key="item.value" :command="item.value">{{
              item.name
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Close } from '@element-plus/icons'

export default defineComponent({
  components: {
    Close,
  },
  setup() {
    const closeMenu = reactive([
      {
        name: '关闭左侧',
        value: 'left',
      },
      {
        name: '关闭右侧',
        value: 'right',
      },
      {
        name: '关闭其他',
        value: 'others',
      },
      {
        name: '全部关闭',
        value: 'all',
      },
    ])
    const store = useStore()
    const router = useRouter()
    const getTags = computed(() => store.state.tags)
    const getCurrentTag = computed(() => store.state.currentTag)
    const clickTag = (tag) => {
      router.push(tag.path)
    }
    const closeTag = (tagTitle) => {
      const tags = getTags.value
      if (tags && tags.length > 1) {
        const filterTags = getTags.value.filter((tag) => tag.title !== tagTitle)
        store.dispatch('changeTags', filterTags)
        if (getCurrentTag.value.title === tagTitle) {
          // 关闭当前页，默认显示左边标签页
          const currentTagIndex = tags.findIndex((tag) => tag.title === tagTitle)
          console.log(currentTagIndex)
          // currentTagIndex >= 1:选择左边tag; currentTagIndex = 0 : 选择首页tag
          if (currentTagIndex >= 1) {
            store.dispatch('changeTag', tags[currentTagIndex - 1])
            router.push(tags[currentTagIndex - 1].path)
          } else {
            router.push('/elementComponents')
          }
        }
      } else {
        store.dispatch('changeTags', [])
        router.push('/elementComponents')
      }
    }
    const closeTagCommand = (command) => {
      const tags = getTags.value
      const currentTagIndex = tags.findIndex((tag) => tag.title === getCurrentTag.value.title)
      let filterTags = []
      switch (command) {
        case 'left':
          filterTags = tags.slice(currentTagIndex, tags.length)
          store.dispatch('changeTags', filterTags)
          break
        case 'right':
          filterTags = tags.slice(0, currentTagIndex + 1)
          store.dispatch('changeTags', filterTags)
          break
        case 'others':
          store.dispatch('changeTags', [getCurrentTag.value])
          break
        case 'all':
          store.dispatch('changeTags', [])
          router.push('/elementComponents')
          break
        default:
          console.log('nothing')
      }
    }
    return {
      closeMenu,
      getCurrentTag,
      getTags,
      clickTag,
      closeTag,
      closeTagCommand,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/theme/theme.scss';
#pageTags {
  position: relative;
  .tag-scroll {
    border-bottom: 1px solid $borderColor;
  }
  .tag-close-menu {
    position: absolute !important;
    right: 0;
    top: 5px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    border-color: $borderColor;
    color: $borderColor;
  }
  .icon-close {
  }
}
</style>
