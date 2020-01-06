import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '仪表盘',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: {
  //     title: '示例',
  //     icon: 'example'
  //   },
  //   children: [{
  //     path: 'table',
  //     name: 'Table',
  //     component: () => import('@/views/table/index'),
  //     meta: {
  //       title: '列表',
  //       icon: 'table'
  //     }
  //   },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: {
  //         title: '树形',
  //         icon: 'tree'
  //       }
  //     }]
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     name: 'Form',
  //     component: () => import('@/views/form/index.vue'),
  //     meta: {
  //       title: '表单',
  //       icon: 'form'
  //     }
  //   }]
  // },
// 404 page must be placed at the end !!!
//   {
//     path: '/404',
//     component: () => import('@/views/404'),
//     hidden: true
//   }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限测试',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '权限页面',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/admin',
    alwaysShow: true, // will always show the root menu
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/system/admin/index'),
        name: 'AdminManagement',
        meta: {
          title: '管理员管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'dept',
        component: () => import('@/views/system/dept/index'),
        name: 'DepartmentalManagement',
        meta: {
          title: '部门管理'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: 'RoleManagement',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      },
      {
        path: 'backgroundmenu',
        component: () => import('@/views/system/menu/index'),
        name: 'BackgroundMenuManagement',
        meta: {
          title: '后台菜单管理',
          roles: ['admin']
        }
      },
      {
        path: 'frontdeskmenu',
        component: () => import('@/views/permission/role'),
        name: 'FrontDeskMenu',
        meta: {
          title: '前台菜单管理',
          roles: ['admin']
        }
      },
      {
        path: 'sql/monitoring',
        component: () => import('@/views/permission/role'),
        name: 'SQLMonitoring',
        meta: {
          title: 'SQL监控',
          roles: ['admin']
        }
      },
      {
        path: 'timing/tasks',
        component: () => import('@/views/permission/role'),
        name: 'TimingTasks',
        meta: {
          title: '定时任务',
          roles: ['admin']
        }
      },
      {
        path: 'parameter',
        component: () => import('@/views/permission/role'),
        name: 'ParameterManagement',
        meta: {
          title: '参数管理',
          roles: ['admin']
        }
      },
      {
        path: 'cloud/object/storage',
        component: () => import('@/views/permission/role'),
        name: 'CloudObjectStorage',
        meta: {
          title: '云对象存储',
          roles: ['admin']
        }
      },
      {
        path: 'dictionary',
        component: () => import('@/views/permission/role'),
        name: 'DictionaryManagement',
        meta: {
          title: '字典管理',
          roles: ['admin']
        }
      },
      {
        path: 'data/dictionary',
        component: () => import('@/views/permission/role'),
        name: 'DataDictionary',
        meta: {
          title: '数据字典',
          roles: ['admin']
        }
      },
      {
        path: 'log',
        component: () => import('@/views/permission/role'),
        name: 'Log',
        meta: {
          title: '系统日志',
          roles: ['admin']
        }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // }
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
