<template>
  <div id="map" ref="wrapRef" class="w-full h-full"></div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, unref, onMounted } from 'vue'

import { useScript } from '@/hooks/useScript'

const BAI_DU_MAP_URL =
  'http://api.map.baidu.com/getscript?v=3.0&ak=w4HSX3ZeqcLSNG6b8ICu82FWVb9f0tzz&services=&t=20211206192911'
export default defineComponent({
  name: 'BaiduMap',
  setup() {
    const wrapRef = ref<HTMLDivElement | null>(null)
    const { toPromise } = useScript({ src: BAI_DU_MAP_URL })

    async function initMap() {
      await toPromise()
      await nextTick()
      const wrapEl = unref(wrapRef)
      if (!wrapEl) return
      const BMap = (window as any).BMap
      const map = new BMap.Map(wrapEl)
      const point = new BMap.Point(116.404, 39.915)
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom(true)
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
