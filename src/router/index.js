import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../layout/index.vue'

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
        component: () => import(/* webpackChunkName: 'table' */ '../views/Table.vue')
      },
      {
        path: 'helloworld',
        name: 'helloworld',
        component: () => import(/* webpackChunkName: 'helloworld' */ '../views/HelloWorld.vue')
      },
      {
        path: 'elementComponents',
        name: 'elementComponents',
        component: () => import(/* webpackChunkName: 'elementComponents' */ '../views/ElementComps.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
