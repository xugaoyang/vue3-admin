<template>
  <h3 class="pb-10">wangEditor</h3>
  <div ref="editor"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import E from 'wangeditor'

export default defineComponent({
  setup() {
    const editor = ref(null)
    let instance: any
    onMounted(() => {
      instance = new E(editor.value)
      Object.assign(instance.config, {
        onchange() {
          console.log(instance.config, 'change')
        },
      })
      instance.create()
    })
    return {
      editor,
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
