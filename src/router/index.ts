import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import NotFoundPage from '@/components/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/cities',
      name: 'cities',
      component: () => import('../views/CityView.vue'),
    },
    {
      path: '/cities/:id',
      name: 'cityById',
      component: () => import('../views/CityDetailView.vue'),
    },

    {
      path: '/poi',
      name: 'poi',
      component: () => import('../views/PoiView.vue'),
    },

    {
      path: '/poi/:id',
      name: 'poiById',
      component: () => import('../views/PoiDetailView.vue'),
    },

    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundPage.vue'),
    },
  ],
})

export default router
