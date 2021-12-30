<template>
  <v-md-editor v-model="text" class="h-full"></v-md-editor>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import markdownText from '@/assets/data/text.js'

export default defineComponent({
  setup() {
    const text = ref('')
    text.value = markdownText
    return {
      text,
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
