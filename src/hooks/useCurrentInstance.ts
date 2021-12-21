// to fixed tslint 2339 error

import { ComponentInternalInstance, getCurrentInstance } from 'vue'
export default function useCurrentInstance() {
  const { appContext, proxy } = getCurrentInstance() as ComponentInternalInstance
  const globalProperties = appContext.config.globalProperties
  return {
    proxy,
    globalProperties,
  }
}
