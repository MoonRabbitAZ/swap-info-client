import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/vue/pages/HomePage.vue'
import TokensPage from '@/vue/pages/TokensPage.vue'
import PairsPage from '@/vue/pages/PairsPage.vue'
import TokenPage from '@/vue/pages/TokenPage.vue'
import PairPage from '@/vue/pages/PairPage.vue'
import { vueRoutes } from '@/vue-router/routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: { name: vueRoutes.home.name },
  },

  {
    path: '/home',
    name: vueRoutes.home.name,
    component: HomePage,
  },
  {
    path: '/tokens',
    name: vueRoutes.tokens.name,
    component: TokensPage,
  },
  {
    path: '/tokens/:id',
    name: vueRoutes.token.name,
    props: true,
    component: TokenPage,
  },
  {
    path: '/pairs',
    name: vueRoutes.pairs.name,
    component: PairsPage,
  },
  {
    path: '/pairs/:id',
    props: true,
    name: vueRoutes.pair.name,
    component: PairPage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
