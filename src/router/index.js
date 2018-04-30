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

import ArticleId from '../components/article/ArticleId'

Vue.use(Router)

export default new Router({
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

      children: [
        {
          path: 'userinfo',
          component: UserInfo
        },
        {
          path: 'resetpwd',
          component: Resetpwd
        },
        {
          path: 'mynote',
          component: MyNote
        },
        {
          path: 'mycollection',
          component: MyCollection
        },
        {
          path: 'myinfo',
          component: MyInfo
        },
        {
          path: 'mytask',
          component: MyTask
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
      component: ArticleId
    },
    {
      path: '/write',
      component: Write
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
