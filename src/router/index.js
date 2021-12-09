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
    component: Layout,
    children: [
      {
        path: 'table',
        name: 'table',
        component: () => import(/* webpackChunkName: 'table' */ '../views/Table.vue'),
        meta: {
          title: 'table',
        },
      },
      {
        path: 'info',
        name: 'info',
        component: () => import(/* webpackChunkName: 'helloworld' */ '../views/HelloWorld.vue'),
        meta: {
          title: 'info',
        },
      },
      {
        path: 'elementComponents',
        name: 'elementComponents',
        component: () =>
          import(/* webpackChunkName: 'elementComponents' */ '../views/ElementComps.vue'),
        meta: {
          title: 'elementComponents',
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
  const isTagInTags = tags.find((val) => tag.title === val.title)
  if (!isTagInTags) {
    store.dispatch('changeTags', [...tags, tag])
  }
  store.dispatch('changeTag', tag)
})

export default router
