import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Layout from '@/layout/Layout'
import SignUpForm from '@/components/Auth/SignUpForm'
import LogInForm from '@/components/Auth/LogInForm'
import Home from '@/components/Home'
import Apply from '@/components/Apply'
import Approval from '@/components/Approval'
// import Dashboard from '@/components/Dashboard'
import Message from '@/components/Message'
import LineChart from '@/components/LineChart.vue'
import ChartTest from '@/components/ChartTest.vue'
import forbid from '@/components/403'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Layout,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/apply',
          name: 'Apply',
          component: Apply
        },
        {
          path: '/approval',
          name: 'Approval',
          component: Approval
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: ChartTest
        },
        {
          path: '/message',
          name: 'Message',
          component: Message
        },
        {
          path: '/403',
          name: '403',
          component: forbid
        },
        {
          path: '/lineChart',
          name: 'lineChart',
          component: LineChart
        },
        {
          path: '/ChartTest',
          name: 'ChartTest',
          component: ChartTest
        }
      ]
    },
    {
      path: '/signup',
      name: 'SignUpForm',
      component: SignUpForm
    },
    {
      path: '/login',
      name: 'Login',
      component: LogInForm
    }
  ]
})
