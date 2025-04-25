import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'users', component: () => import('pages/UsersPage.vue') },
      { path: 'users/:id', component: () => import('pages/UserEditPage.vue') },
      { path: 'tasks', component: () => import('pages/TasksPage.vue') },
      // Добавлен новый маршрут для команд
      { 
        path: 'teams', 
        component: () => import('pages/TeamsPage.vue'),
        meta: { requiresAuth: true } 
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/ServiceLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/signup',
    component: () => import('layouts/ServiceLayout.vue'),
    children: [{ path: '', component: () => import('pages/SignupPage.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;