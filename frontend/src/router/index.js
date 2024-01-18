import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registre',
      name: 'registre',
      component: () => import('../pages/Registre.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../pages/Profile.vue')
    },
    {
      path: '/favoris',
      name: 'favoris',
      component: () => import('../pages/Favoris.vue')
    },
    {
      path: '/calendar',
      name: 'calendrier',
      component: () => import('../pages/Calendrier.vue')
    }
  ]
})

export default router
