<template>
  <el-config-provider :locale="lang === 'en' ? en : zhCn">
    <div class="w-screen h-screen">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import en from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  setup() {
    const store = useStore()
    const lang = computed(() => store.getters.lang)
    return {
      lang,
      en,
      zhCn,
    }
  },
})
</script>

<style>
#nprogress .bar {
  height: 4px !important;
  background: purple !important;
}
</style>
