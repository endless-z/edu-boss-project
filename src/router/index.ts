import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'),
        meta: {
          requireAuth: true
        }
      }
    ]
    // component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫: 任何页面的访问都要经过这里
// 每个守卫方法接收三个参数：
// to: Route 即将要进入的目标 路由对象
// from: Route 当前导航正要离开的路由
// next: Function 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数，通行的标志

router.beforeEach((to, from, next) => {
  // 路由守卫中一定要调用 next(), 否则页面无法展示
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.user) {
      // 跳转登录页面
      next({
        name: 'login'
      })
    } else {
      // 允许通过
      next()
    }
  } else {
    // 允许通过
    next()
  }
})

export default router
