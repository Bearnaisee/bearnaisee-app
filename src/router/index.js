import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index';

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
  {
    path: '/create',
    name: 'Recipe',
    props: {
      default: true,
    },
    meta: {
      title: 'Create Recipe',
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "[request]" */ '../views/user/RecipeBuilder.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  let userInfoLocal = null;

  if (!store?.getters?.getUserInfo?.id) {
    userInfoLocal = JSON.parse(localStorage.getItem('userInfo') || '{}');
  }

  const autheticated =
    (userInfoLocal?.id !== null && userInfoLocal?.id !== undefined) ||
    (store?.getters?.getUserInfo?.id !== null && store?.getters?.getUserInfo?.id !== undefined);

  if (!autheticated && to.matched.some((record) => record.meta.requiresAuth)) {
    next({
      path: '/',
      params: { nextUrl: to.fullPath },
    });

    window.scrollTo(0, 0);
    return;
  }

  next();
  window.scrollTo(0, 0);
});

export default router;
