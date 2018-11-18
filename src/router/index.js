import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import JobList from '@/components/Jobs/JobList'
import JobDetails from '@/components/Jobs/JobDetails'
import PostJob from '@/components/Jobs/PostJob'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Users from '@/components/Admin/Users'
import Courses from '@/components/Admin/Courses'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/jobs',
      name: 'JobList',
      component: JobList
    },
    {
      path: '/jobs/:id',
      name: 'JobDetails',
      props: true,
      component: JobDetails
    },
    {
      path: '/post',
      name: 'PostJob',
      component: PostJob,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      beforeEnter: AuthGuard
    },
    {
      path: '/courses',
      name: 'Courses',
      component: Courses,
      beforeEnter: AuthGuard
    },
    {
      path: '/sign-in',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/sign-up',
      name: 'Signup',
      component: Signup
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
