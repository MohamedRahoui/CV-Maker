import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/main-layout/-.vue'),
    meta: {
      requiresAuth: true,
      linkText: 'Acceuil',
      linkIcon: 'home'
    },
    children: [{
      path: '/',
      name: 'home',
      component: () => import('pages/index/-.vue')
    }, {
      path: '/profile',
      name: 'profile',
      component: () => import('pages/profile/-.vue'),
      meta: {
        linkText: 'Mon profil Conserto',
        linkIcon: 'contact_page'
      }
    }]
  }, {
    path: '/login',
    meta: {
      requiresGuest: true
    },
    component: () => import('pages/login/-.vue')
  }
]

export default routes
