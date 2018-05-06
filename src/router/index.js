import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import User from '../components/User'
import Knowledge from '../components/Knowledge'
import Activity from '../components/Activity'
import Article from '../components/Article'
import Write from '../components/Write'
import Register from '../components/register'
import Login from '../components/Login'

//
import UserInfo from '../components/user/UserInfo'
import Resetpwd from '../components/user/Resetpwd'
import MyNote from '../components/user/MyNote'
import MyCollection from '../components/user/MyCollection'
import MyInfo from '../components/user/MyInfo'
import MyTask from '../components/user/MyTask'

import ArticleContent from '../components/article/ArticleContent'
Vue.use(Router)

const router =  new Router({
  routes: [

    {
      path: '/knowledge',
      component: Knowledge
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/user/',
      component: User,
      meta: {
        requireAuth: true
      },

      children: [
        {
          path: 'userinfo',
          component: UserInfo,
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'resetpwd',
          component: Resetpwd, meta: {
            requireAuth: true
          },
        },
        {
          path: 'mynote',
          component: MyNote, meta: {
            requireAuth: true
          },
        },
        {
          path: 'mycollection',
          component: MyCollection, meta: {
            requireAuth: true
          },
        },
        {
          path: 'myinfo',
          component: MyInfo, meta: {
            requireAuth: true
          },
        },
        {
          path: 'mytask',
          component: MyTask, meta: {
            requireAuth: true
          },
        }
      ]
    },
    {
      path: '/activity',
      component: Activity
    },
    {
      path: '/article',
      component: Article,
    },
    {
      path: '/article/:topic_id',
      component: ArticleContent
    },
    {
      path: '/write',
      component: Write,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/write/:topic_id',
      component: Write,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    }
  ],
  
})


router.beforeEach((to, from, next) => {
  
  //如果没有匹配到对应的路由页面
  if (to.matched.length === 0) {
    //如果上级未匹配到路由则跳转主页,如果能匹配就去来的页面
    from.name ? next({ name: from.name }) : next('/index');
  } else {
    //如果路由有meta属性，代表必须先登陆再访问
    if (to.matched.some(res => res.meta.requireAuth)) {
      //判断session中是否有登陆信息
      if (sessionStorage.getItem('user')) {
        console.log(1)
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      //没有匹配
      next()
    }
  }
})


export default router