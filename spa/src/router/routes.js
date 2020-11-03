const routes = [
  {
    path: '/',
    component: () => import('layouts/main-layout/-.vue'),
    meta: {
      requiresAuth: true,
      linkText: 'Acceuil',
      linkIcon: 'fas fa-home'
    },
    children: [{
      path: "/",
      name: 'home',
      component: () => import('pages/index/-.vue'),
    }]
  }, {
    path: '/login',
    meta: {
      requiresGuest: true,
    },
    component: () => import('pages/login/-.vue'),
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/error-404/-.vue")
  });
}

export default routes;
