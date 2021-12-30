/* eslint-disable */
declare module '*.vue' {
  // import type { DefineComponent } from 'vue'
  // const component: DefineComponent<{}, {}, any>
  // export default component
  import { ComponentOptions } from "vue"
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module '@kangc/v-md-editor/lib/theme/github.js'

declare module '@kangc/v-md-editor/lib/preview'

declare module '@kangc/v-md-editor'