<template>
  <div class="logo">
    <img src="@/assets/logo.png" alt="" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo',
  setup() {
    
    return {

    }
  }
})
</script>

<style scoped>
.logo {
  display: inline-block;
  padding: 10px 5px;
  width: 200px;
  height: 100%;
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>