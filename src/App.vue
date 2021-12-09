<template>
  <div class="w-screen h-screen">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script>

<style>
#nprogress .bar {
  height: 4px !important;
  background: purple !important;
}
</style>
