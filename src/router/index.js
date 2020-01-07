import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [
  {
      path: '/',
      redirect:'/example/table',
      hidden: true
  },

  // {
  //     path: '/api/heweikua',
  //     name: 'ApiResult',
  //     component: () => import('@/views/index/index'),
  //     hidden: true
  // },

  {
      path: '/example',
      redirect: '/example/table',
      component: () => import('@/views/index/index'),
      name: 'Example',
      children: [{
          path: 'table',
          name: 'Table',
          component: () => import('@/views/index/index'),
          hidden: true
        },
        {
          path: 'tree',
          name: 'Tree',
          component: () => import('@/views/index/index'),
          hidden: true
        }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
