import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'

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
      component: () => import('../components/Registre.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../components/Profile.vue')
    },
    {
      path: '/favoris',
      name: 'favoris',
      component: () => import('../components/Favoris.vue')
    },
    {
      path: '/calendrier',
      name: 'calendrier',
      component: () => import('../components/Calendrier.vue')
    }
  ]
})

export default router
