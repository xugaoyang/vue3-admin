<template>
  <el-switch
    v-model="switchValue"
    inline-prompt
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-text="中"
    inactive-text="英"
    @change="changeLang"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import useCurrentInstance from '@/hooks/useCurrentInstance'

export default defineComponent({
  components: {},
  setup() {
    let store = useStore()
    let { proxy } = useCurrentInstance()
    const switchValue = ref(true)
    const lang = computed(() => store.state.lang)
    switchValue.value = lang.value === 'zh-cn' ? true : false
    const changeLang = (val: boolean) => {
      const currentLang = val ? 'zh-cn' : 'en'
      proxy!.$i18n.locale = currentLang
      store.dispatch('changeLang', currentLang)
    }
    onMounted(() => {
      // 初始化
      proxy!.$i18n.locale = lang.value
    })
    return {
      switchValue,
      changeLang,
    }
  },
})
</script>

<style lang="scss" scoped></style>
