import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Frontpage',
    component: () => import(/* webpackChunkName: "[request]" */ '../views/Frontpage.vue'),
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "[request]" */ '../views/Dashboard.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "[request]" */ '../views/Search.vue'),
  },
  {
    path: '/tos',
    name: 'Tos',
    component: () => import(/* webpackChunkName: "[request]" */ '../components/TermsOfService.vue'),
  },

  {
    path: '/:username',
    name: 'User',
    props: {
      default: true,
    },
    component: () => import(/* webpackChunkName: "[request]" */ '../views/user/User.vue'),
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "[request]" */ '../views/user/Profile.vue'),
      },
      {
        path: '/:username/recipes',
        name: 'Recipes',
        props: {
          default: true,
        },
        component: () => import(/* webpackChunkName: "[request]" */ '../views/user/Recipes.vue'),
      },
      {
        path: '/:username/:slug',
        name: 'Recipe',
        props: {
          default: true,
        },
        component: () => import(/* webpackChunkName: "[request]" */ '../views/user/Recipe.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
