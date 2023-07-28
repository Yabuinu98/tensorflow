import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/kogpt.vue'

const routes = [
  {
    path: '/',
    name: 'kogpt',
    component: HomeView
  },
  {
    path: '/chat',
    name: 'chat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/chatgpt.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
