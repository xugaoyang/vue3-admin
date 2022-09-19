import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '../layout/index.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    redirect: '/workbench',
    component: Layout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: 'login' */ '../views/Login.vue'),
        meta: {
          title: 'login',
        },
      },
      {
        path: 'workbench',
        name: 'workbench',
        component: () => import(/* webpackChunkName: 'workbench' */ '../views/Workbench.vue'),
        meta: {
          title: 'workbench',
        },
      },
      {
        path: 'table',
        name: 'table',
        component: () => import(/* webpackChunkName: 'table' */ '../views/elemeplus/Table.vue'),
        meta: {
          title: 'table',
        },
      },
      {
        path: 'info',
        name: 'info',
        component: () => import(/* webpackChunkName: 'helloworld' */ '../views/elemeplus/Info.vue'),
        meta: {
          title: 'info',
        },
      },
      {
        path: 'elementComponents',
        name: 'elementComponents',
        component: () =>
          import(/* webpackChunkName: 'elementComponents' */ '../views/elemeplus/ElementComps.vue'),
        meta: {
          title: 'elementComponents',
        },
      },
      {
        path: 'tree',
        name: 'tree',
        component: () => import(/* webpackChunkName: 'tree' */ '../views/elemeplus/Tree.vue'),
        meta: {
          title: 'tree',
        },
      },

      {
        path: 'echarts',
        name: 'echarts',
        component: () => import(/* webpackChunkName: 'echarts' */ '../views/charts/Echarts.vue'),
        meta: {
          title: 'echarts',
        },
      },
      {
        path: 'baiduMap',
        name: 'baiduMap',
        component: () => import(/* webpackChunkName: 'baiduMap' */ '../views/charts/BaiduMap.vue'),
        meta: {
          title: 'baiduMap',
        },
      },
      {
        path: 'baiduMapGl',
        name: 'baiduMapGl',
        component: () =>
          import(/* webpackChunkName: 'baiduMapGl' */ '../views/charts/BaiduMapGl.vue'),
        meta: {
          title: 'baiduMapGl',
        },
      },
      {
        path: 'i18n',
        name: 'i18n',
        component: () => import(/* webpackChunkName: 'i18n' */ '../views/features/I18n.vue'),
        meta: {
          title: 'i18n',
        },
      },
      {
        path: 'watermark',
        name: 'watermark',
        component: () =>
          import(/* webpackChunkName: 'watermark' */ '../views/features/Watermark.vue'),
        meta: {
          title: 'watermark',
        },
      },
      {
        path: 'editor',
        name: 'editor',
        component: () => import(/* webpackChunkName: 'editor' */ '../views/components/Editor.vue'),
        meta: {
          title: 'editor',
        },
      },
      {
        path: 'markdown',
        name: 'markdown',
        component: () =>
          import(/* webpackChunkName: 'markdown' */ '../views/components/Markdown.vue'),
        meta: {
          title: 'markdown',
        },
      },
      {
        path: 'crypto',
        name: 'crypto',
        component: () => import(/* webpackChunkName: 'crypto' */ '../views/features/Crypto.vue'),
        meta: {
          title: 'crypto',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  NProgress.done()
})

router.afterEach((to) => {
  NProgress.done()
  console.log(to)
  if (to.path !== '/login') {
    const tag = {
      title: to.meta.title,
      name: to.name,
      path: to.path,
      fullPath: to.fullPath,
      meta: to.meta,
      params: to.params,
      query: to.query,
    }
    const tags = store.state.tags
    const isTagInTags = tags.find((val: { title: string }) => tag.title === val.title)
    if (!isTagInTags) {
      store.dispatch('changeTags', [...tags, tag])
    }
    store.dispatch('changeTag', tag)
  }
})

export default router
