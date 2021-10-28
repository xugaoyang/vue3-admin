<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style scoped>
:root {
  --el-color-primary: lightgreen;
}
#app {
  width: 100vw;
  height: 100vh;
}
</style>
