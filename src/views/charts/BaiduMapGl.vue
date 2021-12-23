<template>
  <div ref="wrapRef" class="w-full h-full"></div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, unref, onMounted } from 'vue'

import { useScript } from '@/hooks/useScript'

const BAI_DU_MAPGL_URL =
  'http://api.map.baidu.com/getscript?&type=webgl&v=1.0&ak=w4HSX3ZeqcLSNG6b8ICu82FWVb9f0tzz'
export default defineComponent({
  name: 'BaiduMap',
  setup() {
    const wrapRef = ref<HTMLDivElement | null>(null)
    const { toPromise } = useScript({ src: BAI_DU_MAPGL_URL })

    async function initMap() {
      await toPromise()
      await nextTick()
      const wrapEl = unref(wrapRef)
      if (!wrapEl) return
      const BMapGL = (window as any).BMapGL
      const map = new BMapGL.Map(wrapEl) // 创建Map实例
      map.centerAndZoom(new BMapGL.Point(116.28019, 40.049191), 19) // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
      map.setHeading(64.5)
      map.setTilt(73)
    }

    onMounted(() => {
      initMap()
    })

    return { wrapRef }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
